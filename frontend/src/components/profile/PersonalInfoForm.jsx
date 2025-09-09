import React, { useEffect, useMemo, useState } from "react";

/** Local validation helpers (client-side) */
const emailRegex = /\S+@\S+\.\S+/;

function validatePersonal(form) {
  const errors = {};
  if (!form.firstName?.trim()) errors.firstName = "First name is required.";
  if (!form.lastName?.trim()) errors.lastName = "Last name is required.";
  if (!emailRegex.test(form.email || "")) errors.email = "Enter a valid email.";
  const phoneDigits = (form.phone || "").replace(/\D/g, "");
  if (phoneDigits.length < 7 || phoneDigits.length > 15) errors.phone = "Enter a valid phone number.";
  if (!form.address?.trim()) errors.address = "Address is required.";
  if (!form.location?.trim()) errors.location = "Select a location.";
  if (!form.postal?.trim()) errors.postal = "Postal code is required.";
  if (!form.dob) {
    errors.dob = "Date of birth is required.";
  } else {
    const dob = new Date(form.dob + "T00:00:00");
    const today = new Date();
    if (isNaN(dob.getTime())) errors.dob = "Invalid date.";
    else {
      if (dob > today) errors.dob = "Date cannot be in the future.";
      const age =
        today.getFullYear() -
        dob.getFullYear() -
        (today.getMonth() < dob.getMonth() ||
          (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
          ? 1
          : 0);
      if (age < 13) errors.dob = "You must be at least 13 years old.";
    }
  }
  return errors;
}

/**
 * Props:
 * - user, form, setForm, onDiscard, onSave, saving
 * - verifyEmail?: (email: string) => Promise<boolean>    // OPTIONAL: server deliverability check
 */
export default function PersonalInfoForm({
  user,
  form,
  setForm,
  onDiscard,
  onSave,
  saving = false,
  verifyEmail, // optional async checker; if not provided we only do format validation
}) {
  const [touched, setTouched] = useState({});
  const errors = useMemo(() => validatePersonal(form), [form]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };
  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));
  const show = (name) => (touched[name] ? errors[name] : null);

  /** -------- Email badge state -------- */
  const [emailStatus, setEmailStatus] = useState("idle");
  // "idle" | "syntax-invalid" | "checking" | "syntax-valid" | "deliverable" | "undeliverable"

  useEffect(() => {
    const email = form.email || "";
    if (!email) { setEmailStatus("idle"); return; }

    const syntaxOk = emailRegex.test(email);
    if (!syntaxOk) { setEmailStatus("syntax-invalid"); return; }

    // If no server checker provided, we stop at syntax-valid
    if (!verifyEmail) { setEmailStatus("syntax-valid"); return; }

    // With server checker: debounce then verify deliverability
    let cancelled = false;
    setEmailStatus("checking");
    const t = setTimeout(async () => {
      try {
        const ok = await verifyEmail(email);
        if (!cancelled) setEmailStatus(ok ? "deliverable" : "undeliverable");
      } catch {
        // If backend fails, fall back to syntax-valid
        if (!cancelled) setEmailStatus("syntax-valid");
      }
    }, 400);

    return () => { cancelled = true; clearTimeout(t); };
  }, [form.email, verifyEmail]);

  const EmailBadge = () => {
    if (emailStatus === "checking") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-600">
          <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="3" className="opacity-25"></circle>
            <path d="M12 2a10 10 0 0 1 10 10" strokeWidth="3" className="opacity-75"></path>
          </svg>
          Checking…
        </span>
      );
    }
    if (emailStatus === "deliverable" || emailStatus === "syntax-valid") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-600">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293A1 1 0 106.293 10.707l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified
        </span>
      );
    }
    if (emailStatus === "undeliverable") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 5h2v7H9V5zm0 8h2v2H9v-2z" clipRule="evenodd" />
          </svg>
          Undeliverable
        </span>
      );
    }
    return null; // hide when empty or invalid format
  };

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 lg:col-span-8 min-w-0">
      <h2 className="text-2xl font-semibold text-gray-900">Personal Information</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (Object.keys(errors).length === 0) onSave();
          else setTouched({
            firstName: true, lastName: true, email: true, address: true,
            phone: true, dob: true, location: true, postal: true,
          });
        }}
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5"
      >
        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">First Name</label>
          <input
            name="firstName" value={form.firstName} onChange={onChange} onBlur={onBlur}
            className={`mt-1 w-full rounded-full border px-4 py-2.5 focus:outline-none focus:ring-2 ${
              show("firstName") ? "border-red-400 focus:ring-red-500" : "border-gray-200 focus:ring-black"
            }`}
          />
          {show("firstName") && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
        </div>

        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">Last Name</label>
          <input
            name="lastName" value={form.lastName} onChange={onChange} onBlur={onBlur}
            className={`mt-1 w-full rounded-full border px-4 py-2.5 focus:outline-none focus:ring-2 ${
              show("lastName") ? "border-red-400 focus:ring-red-500" : "border-gray-200 focus:ring-black"
            }`}
          />
          {show("lastName") && <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-center justify-between text-sm text-gray-600">
            <span>Email</span>
            <EmailBadge />
          </label>
          <input
            type="email" name="email" value={form.email} onChange={onChange} onBlur={onBlur}
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${
              show("email") ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"
            }`}
          />
          {show("email") && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-gray-600">Address</label>
          <input
            name="address" value={form.address} onChange={onChange} onBlur={onBlur}
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${
              show("address") ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"
            }`}
          />
          {show("address") && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
        </div>

        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">Phone Number</label>
          <input
            name="phone" value={form.phone} onChange={onChange} onBlur={onBlur}
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${
              show("phone") ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"
            }`}
          />
          {show("phone") && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">Date of Birth</label>
          <input
            type="date" name="dob" value={form.dob} onChange={onChange} onBlur={onBlur}
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${
              show("dob") ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"
            }`}
          />
          {show("dob") && <p className="mt-1 text-xs text-red-600">{errors.dob}</p>}
        </div>

        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">Location</label>
          <div className="relative mt-1">
            <select
              name="location" value={form.location} onChange={onChange} onBlur={onBlur}
              className={`w-full appearance-none rounded-full border px-4 py-2.5 pr-10 bg-white ${
                show("location") ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"
              }`}
            >
              <option value="">Select location</option>
              <option>Atlanta, USA</option>
              <option>New York, USA</option>
              <option>Los Angeles, USA</option>
              <option>Chicago, USA</option>
              <option>Miami, USA</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.136l3.71-3.905a.75.75 0 111.08 1.04l-4.24 4.46a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd"/></svg>
            </span>
          </div>
          {show("location") && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
        </div>

        <div className="sm:col-span-1">
          <label className="text-sm text-gray-600">Postal Code</label>
          <input
            name="postal" value={form.postal} onChange={onChange} onBlur={onBlur}
            className={`mt-1 w-full rounded-full border px-4 py-2.5 ${
              show("postal") ? "border-red-400 focus:ring-2 focus:ring-red-500" : "border-gray-200"
            }`}
          />
          {show("postal") && <p className="mt-1 text-xs text-red-600">{errors.postal}</p>}
        </div>

        <div className="sm:col-span-2 mt-2 flex flex-col sm:flex-row gap-4 sm:justify-end">
          <button type="button" onClick={onDiscard}
            className="rounded-full border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition">
            Discard Changes
          </button>
          <button type="submit" disabled={saving || Object.keys(errors).length > 0}
            className={`rounded-full px-6 py-3 text-sm font-medium transition ${
              saving || Object.keys(errors).length>0 ? "bg-gray-400 text-white cursor-not-allowed" : "bg-black text-white hover:opacity-90"
            }`}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
