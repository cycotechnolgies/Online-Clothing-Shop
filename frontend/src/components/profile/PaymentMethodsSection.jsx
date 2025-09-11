import React, { useEffect, useState } from "react";

/** Validation + helpers */
function formatCardNumber(val) {
  const digits = val.replace(/\D/g, "");
  return digits.replace(/(.{4})/g, "$1 ").trim();
}
function luhnOk(num) {
  const digits = num.replace(/\D/g, "");
  let sum = 0, alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) { n *= 2; if (n > 9) n -= 9; }
    sum += n; alt = !alt;
  }
  return digits.length >= 12 && digits.length <= 19 && sum % 10 === 0;
}
function expiryIsValid(mm, yyyy) {
  const m = parseInt(mm, 10), y = parseInt(yyyy, 10);
  if (!(m >= 1 && m <= 12) || !(y >= 2000 && y <= 2100)) return false;
  const lastOfMonth = new Date(y, m, 0, 23, 59, 59);
  return lastOfMonth >= new Date();
}

/** TODO: replace with PSP tokenization (Stripe/Adyen) */
async function addPaymentMethodToken(/* token */) {
  await new Promise(r => setTimeout(r, 400));
  return { ok: true };
}

export default function PaymentMethodsSection({ user }) {
  const [useProfileAddress, setUseProfileAddress] = useState(true);
  const [form, setForm] = useState({
    nameOnCard: `${user.firstName} ${user.lastName}`,
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
    line1: user.address || "",
    line2: "",
    city: "",
    region: "",
    country: "US",
    postal: user.postal || "",
    setDefault: true,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === "cardNumber" ? formatCardNumber(value) : value }));
  };

  useEffect(() => {
    if (useProfileAddress) {
      setForm((p) => ({ ...p, line1: user.address || "", postal: user.postal || "" }));
    }
  }, [useProfileAddress, user.address, user.postal]);

  const validate = () => {
    const e = {};
    if (!form.nameOnCard.trim()) e.nameOnCard = "Cardholder name is required.";
    const rawPan = form.cardNumber.replace(/\D/g, "");
    if (!luhnOk(rawPan)) e.cardNumber = "Enter a valid card number.";
    if (!expiryIsValid(form.expMonth, form.expYear)) e.expiry = "Expiry is invalid or in the past.";
    if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = "CVC must be 3–4 digits.";
    if (!useProfileAddress) {
      if (!form.line1.trim()) e.line1 = "Billing address is required.";
      if (!form.country) e.country = "Country is required.";
      if (!form.postal.trim()) e.postal = "Postal code is required.";
    } else {
      if (!form.line1.trim() || !form.postal.trim()) e.profileAddress = "Your profile address/postal is incomplete.";
    }
    return e;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(""); setOk("");
    const v = validate(); setErrors(v);
    if (Object.keys(v).length) return;

    try {
      setSaving(true);
      await addPaymentMethodToken(/* token from PSP */);
      setOk("Payment method saved.");
      setForm((p) => ({ ...p, cardNumber: "", cvc: "" }));
    } catch (ex) {
      setErr(ex.message || "Failed to save payment method.");
    } finally { setSaving(false); }
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 lg:col-span-8 min-w-0">
      <h2 className="text-2xl font-semibold text-gray-900">Payment Methods</h2>

      <form onSubmit={onSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
        <div className="sm:col-span-2">
          <label className="text-sm text-gray-600">Name on Card</label>
          <input name="nameOnCard" value={form.nameOnCard} onChange={onChange}
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${errors.nameOnCard ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"}`} />
          {errors.nameOnCard && <p className="mt-1 text-xs text-red-600">{errors.nameOnCard}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-gray-600">Card Number</label>
          <input name="cardNumber" inputMode="numeric" autoComplete="cc-number"
            value={form.cardNumber} onChange={onChange} placeholder="1234 5678 9012 3456"
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${errors.cardNumber ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"}`} />
          {errors.cardNumber && <p className="mt-1 text-xs text-red-600">{errors.cardNumber}</p>}
        </div>

        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">Expiry Month (MM)</label>
          <input name="expMonth" inputMode="numeric" maxLength={2} value={form.expMonth} onChange={onChange}
            placeholder="MM"
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${errors.expiry ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"}`} />
        </div>

        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">Expiry Year (YYYY)</label>
          <input name="expYear" inputMode="numeric" maxLength={4} value={form.expYear} onChange={onChange}
            placeholder="YYYY"
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${errors.expiry ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"}`} />
          {errors.expiry && <p className="mt-1 text-xs text-red-600">{errors.expiry}</p>}
        </div>

        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">CVC</label>
          <input name="cvc" inputMode="numeric" maxLength={4} value={form.cvc} onChange={onChange}
            placeholder="CVC"
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${errors.cvc ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"}`} />
          {errors.cvc && <p className="mt-1 text-xs text-red-600">{errors.cvc}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={useProfileAddress} onChange={(e)=>setUseProfileAddress(e.target.checked)} className="accent-black h-4 w-4" />
            Use profile address
          </label>
          {errors.profileAddress && <p className="mt-1 text-xs text-red-600">{errors.profileAddress}</p>}
        </div>

        {!useProfileAddress && (
          <>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-600">Address Line 1</label>
              <input name="line1" value={form.line1} onChange={onChange}
                className={`mt-1 w-full rounded-full border px-4 py-2.5 ${errors.line1 ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"}`} />
              {errors.line1 && <p className="mt-1 text-xs text-red-600">{errors.line1}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-gray-600">Address Line 2 (optional)</label>
              <input name="line2" value={form.line2} onChange={onChange}
                className="mt-1 w-full rounded-full border border-gray-200 px-4 py-2.5" />
            </div>
            <div className="sm:col-span-1">
              <label className="text-sm text-gray-600">City</label>
              <input name="city" value={form.city} onChange={onChange}
                className="mt-1 w-full rounded-full border border-gray-200 px-4 py-2.5" />
            </div>
            <div className="sm:col-span-1">
              <label className="text-sm text-gray-600">State/Region</label>
              <input name="region" value={form.region} onChange={onChange}
                className="mt-1 w-full rounded-full border border-gray-200 px-4 py-2.5" />
            </div>
            <div className="sm:col-span-1">
              <label className="text-sm text-gray-600">Country</label>
              <select name="country" value={form.country} onChange={onChange}
                className={`mt-1 w-full rounded-full border px-4 py-2.5 bg-white ${errors.country ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"}`}>
                <option value="">Select</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
              </select>
              {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country}</p>}
            </div>
            <div className="sm:col-span-1">
              <label className="text-sm text-gray-600">ZIP/Postal</label>
              <input name="postal" value={form.postal} onChange={onChange}
                className={`mt-1 w-full rounded-full border px-4 py-2.5 ${errors.postal ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"}`} />
              {errors.postal && <p className="mt-1 text-xs text-red-600">{errors.postal}</p>}
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.setDefault} onChange={(e)=>setForm(p=>({...p,setDefault:e.target.checked}))} className="accent-black h-4 w-4" />
            Set as default payment method
          </label>
        </div>

        {err && <p className="sm:col-span-2 text-sm text-red-600">{err}</p>}
        {ok && <p className="sm:col-span-2 text-sm text-green-600">{ok}</p>}

        <div className="sm:col-span-2 mt-2 flex justify-end">
          <button type="submit" disabled={saving}
            className={`rounded-full px-6 py-3 text-sm font-medium transition ${saving?"bg-gray-400 text-white cursor-not-allowed":"bg-black text-white hover:opacity-90"}`}>
            {saving ? "Saving..." : "Save Payment Method"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-xs text-gray-500">
        Use a PCI-compliant provider (e.g., Stripe Elements). Do not send raw card numbers to your backend.
      </p>
    </section>
  );
}
