import React, { useState } from "react";

/** Client-side validation */
const emailRegex = /\S+@\S+\.\S+/;
const pwdPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10,}$/;

/** TODO: replace with real API calls */
async function updateEmailAPI({ newEmail, currentPassword }) {
  await new Promise(r => setTimeout(r, 400));
  return { ok: true };
}
async function changePasswordAPI({ currentPassword, newPassword }) {
  await new Promise(r => setTimeout(r, 400));
  return { ok: true };
}

export default function LoginPasswordSection({ user }) {
  const [emailForm, setEmailForm] = useState({ newEmail: "", currentPassword: "" });
  const [pwdForm, setPwdForm] = useState({ currentPassword: "", newPassword: "", confirmNewPassword: "" });

  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPwd, setLoadingPwd] = useState(false);
  const [errEmail, setErrEmail] = useState("");
  const [errPwd, setErrPwd] = useState("");
  const [okEmail, setOkEmail] = useState("");
  const [okPwd, setOkPwd] = useState("");
  const [show, setShow] = useState({ eCur: false, pCur: false, pNew: false, pConf: false });

  const submitEmail = async (e) => {
    e.preventDefault();
    setErrEmail(""); setOkEmail("");
    if (!emailRegex.test(emailForm.newEmail)) return setErrEmail("Please enter a valid email.");
    if (emailForm.newEmail === user.email) return setErrEmail("New email cannot be the same as current.");
    if (!emailForm.currentPassword) return setErrEmail("Please enter your current password.");
    try {
      setLoadingEmail(true);
      await updateEmailAPI(emailForm);
      setOkEmail("Verification link sent to the new email. Please confirm.");
      setEmailForm({ newEmail: "", currentPassword: "" });
    } catch (err) {
      setErrEmail(err.message || "Failed to update email");
    } finally { setLoadingEmail(false); }
  };

  const submitPassword = async (e) => {
    e.preventDefault();
    setErrPwd(""); setOkPwd("");
    if (!pwdPolicy.test(pwdForm.newPassword)) {
      return setErrPwd("Password must be 10+ chars incl. upper, lower, number, symbol.");
    }
    if (pwdForm.newPassword !== pwdForm.confirmNewPassword) {
      return setErrPwd("New password and confirmation do not match.");
    }
    if (!pwdForm.currentPassword) {
      return setErrPwd("Please enter your current password.");
    }
    try {
      setLoadingPwd(true);
      await changePasswordAPI({ currentPassword: pwdForm.currentPassword, newPassword: pwdForm.newPassword });
      setOkPwd("Password updated successfully.");
      setPwdForm({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    } catch (err) {
      setErrPwd(err.message || "Failed to change password");
    } finally { setLoadingPwd(false); }
  };

  const Input = ({ type = "text", ...props }) => (
    <input type={type} {...props}
      className={`mt-1 w-full rounded-full border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black ${props.className || ""}`} />
  );
  const Toggle = ({ on, onClick }) => (
    <button type="button" onClick={onClick} className="text-xs font-medium text-gray-600 hover:text-gray-900">
      {on ? "Hide" : "Show"}
    </button>
  );

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 md:p-8 lg:col-span-8 min-w-0">
      <h2 className="text-2xl font-semibold text-gray-900">Login & Password</h2>

      <div className="mt-6">
        <label className="text-sm text-gray-600">Current Email</label>
        <Input value={user.email} readOnly />
      </div>

      <form onSubmit={submitEmail} className="mt-6 border-t border-gray-100 pt-6">
        <h3 className="text-lg font-semibold text-gray-900">Change Email</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <div className="sm:col-span-1">
            <label className="text-sm text-gray-600">New Email</label>
            <Input type="email" name="newEmail" value={emailForm.newEmail}
              onChange={(e)=>setEmailForm(p=>({...p,[e.target.name]:e.target.value}))} placeholder="you@domain.com"/>
          </div>
          <div className="sm:col-span-1">
            <label className="flex items-center justify-between text-sm text-gray-600">
              <span>Current Password</span>
              <Toggle on={show.eCur} onClick={()=>setShow(s=>({...s,eCur:!s.eCur}))}/>
            </label>
            <Input name="currentPassword" type={show.eCur?"text":"password"} value={emailForm.currentPassword}
              onChange={(e)=>setEmailForm(p=>({...p,[e.target.name]:e.target.value}))} placeholder="••••••••••"/>
          </div>
        </div>
        {errEmail && <p className="mt-2 text-sm text-red-600">{errEmail}</p>}
        {okEmail && <p className="mt-2 text-sm text-green-600">{okEmail}</p>}
        <div className="mt-4 flex justify-end">
          <button type="submit" disabled={loadingEmail}
            className={`rounded-full px-6 py-3 text-sm font-medium transition ${loadingEmail?"bg-gray-400 text-white cursor-not-allowed":"bg-black text-white hover:opacity-90"}`}>
            {loadingEmail ? "Saving..." : "Save Email"}
          </button>
        </div>
      </form>

      <form onSubmit={submitPassword} className="mt-8 border-t border-gray-100 pt-6">
        <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <div className="sm:col-span-1">
            <label className="flex items-center justify-between text-sm text-gray-600">
              <span>Current Password</span>
              <Toggle on={show.pCur} onClick={()=>setShow(s=>({...s,pCur:!s.pCur}))}/>
            </label>
            <Input name="currentPassword" type={show.pCur?"text":"password"} value={pwdForm.currentPassword}
              onChange={(e)=>setPwdForm(p=>({...p,[e.target.name]:e.target.value}))} placeholder="••••••••••"/>
          </div>

          <div className="sm:col-span-1">
            <label className="flex items-centered justify-between text-sm text-gray-600">
              <span>New Password</span>
              <Toggle on={show.pNew} onClick={()=>setShow(s=>({...s,pNew:!s.pNew}))}/>
            </label>
            <Input name="newPassword" type={show.pNew?"text":"password"} value={pwdForm.newPassword}
              onChange={(e)=>setPwdForm(p=>({...p,[e.target.name]:e.target.value}))} placeholder="At least 10 characters"/>
          </div>

          <div className="sm:col-span-1">
            <label className="flex items-center justify-between text-sm text-gray-600">
              <span>Confirm New Password</span>
              <Toggle on={show.pConf} onClick={()=>setShow(s=>({...s,pConf:!s.pConf}))}/>
            </label>
            <Input name="confirmNewPassword" type={show.pConf?"text":"password"} value={pwdForm.confirmNewPassword}
              onChange={(e)=>setPwdForm(p=>({...p,[e.target.name]:e.target.value}))} placeholder="Repeat new password"/>
          </div>

          <div className="sm:col-span-1">
            <p className="text-xs text-gray-500 mt-7">
              Must include upper/lower, number, symbol. Minimum 10 characters.
            </p>
          </div>
        </div>

        {errPwd && <p className="mt-2 text-sm text-red-600">{errPwd}</p>}
        {okPwd && <p className="mt-2 text-sm text-green-600">{okPwd}</p>}
        <div className="mt-4 flex justify-end">
          <button type="submit" disabled={loadingPwd}
            className={`rounded-full px-6 py-3 text-sm font-medium transition ${loadingPwd?"bg-gray-400 text-white cursor-not-allowed":"bg-black text-white hover:opacity-90"}`}>
            {loadingPwd ? "Saving..." : "Save Password"}
          </button>
        </div>

        <div className="mt-4">
          <a href="/forgot-password" className="text-sm text-gray-700 hover:text-black underline">
            Forgot current password?
          </a>
        </div>
      </form>
    </section>
  );
}
