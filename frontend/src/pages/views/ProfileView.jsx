import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PersonalInfoForm from "../../components/profile/PersonalInfoForm";
import LoginPasswordSection from "../../components/profile/LoginPasswordSection";
import PaymentMethodsSection from "../../components/profile/PaymentMethodsSection";
import { FaUser, FaLock, FaCreditCard, FaSignOutAlt, FaPen } from "react-icons/fa";

export default function ProfileView() {
  // You can hydrate this from your AuthContext or GET /api/me on mount
  const [user, setUser] = useState({
    firstName: "Roland",
    lastName: "Donald",
    role: "Cashier",
    email: "rolandDonald@mail.com",
    address: "3605 Parker Rd.",
    phone: "(405) 555-0128",
    dob: "1995-02-01",
    location: "Atlanta, USA",
    postal: "30301",
    gender: "male",
    emailVerified: true,
    avatarUrl: "https://i.pravatar.cc/200?img=14",
  });

  const [form, setForm] = useState(user);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [active, setActive] = useState("personal"); // default (left item)

  const [saving, setSaving] = useState(false);

  useEffect(() => setForm(user), [user]);

  const onPickAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const url = URL.createObjectURL(file);
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(url);
  };

  const onDiscard = () => {
    setForm(user);
    setAvatarFile(null);
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview("");
  };

  const onSave = async () => {
    // TODO: integrate API (presigned upload + PUT /api/me)
    setSaving(true);
    try {
      // simulate save
      await new Promise((r) => setTimeout(r, 500));
      setUser((p) => ({ ...form, avatarUrl: avatarPreview || p.avatarUrl }));
      setAvatarFile(null);
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
      setAvatarPreview("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-6xl p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LEFT: sidebar */}
            <aside className="bg-white rounded-2xl shadow-sm p-6 lg:col-span-4">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={avatarPreview || user.avatarUrl}
                    alt="avatar"
                    className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow"
                  />
                  <label
                    htmlFor="avatarInput"
                    className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black text-white shadow"
                    title="Change photo"
                  >
                    <FaPen className="text-sm" aria-hidden="true" />
                  </label>
                  <input
                    id="avatarInput"
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={onPickAvatar}
                    className="hidden"
                  />
                </div>

                <h3 className="mt-3 text-base font-semibold text-gray-900">
                  {user.firstName} {user.lastName}
                </h3>
                {/* <p className="text-sm text-gray-500">{user.role}</p> */}
              </div>

              <nav className="mt-8 space-y-3">
                <button
                  onClick={() => setActive("personal")}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    active === "personal" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <FaUser className="text-lg" aria-hidden="true" />
                  <span className="font-medium">Personal Information</span>
                </button>

                <button
                  onClick={() => setActive("security")}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    active === "security" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <FaLock className="text-lg" aria-hidden="true" />
                  <span>Login & Password</span>
                </button>

                <button
                  onClick={() => setActive("payment")}
                  className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    active === "payment" ? "bg-gray-100 text-gray-900" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <FaCreditCard className="text-lg" aria-hidden="true" />
                  <span>Payment Methods</span>
                </button>

                <button className="w-full flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-gray-100 text-gray-700">
                  <FaSignOutAlt className="text-lg" aria-hidden="true" />
                  <span>Log Out</span>
                </button>
              </nav>
            </aside>

            {/* RIGHT: switch among three sections */}
            {active === "personal" && (
              <PersonalInfoForm
                user={user}
                form={form}
                setForm={setForm}
                onDiscard={onDiscard}
                onSave={onSave}
                saving={saving}
              />
            )}
            {active === "security" && <LoginPasswordSection user={user} />}
            {active === "payment" && <PaymentMethodsSection user={user} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
