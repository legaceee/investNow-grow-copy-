import { useState } from "react";
import axios from "axios";
import { Pen } from "lucide-react";

function Otpwindow({ setEmailOtpSend, email, onClose, modalManage }) {
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Step 1: verify OTP
  async function handleVerifyOtp() {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/verify-otp",
        {
          email,
          otp,
        }
      );

      if (res.data.message === "Email verified successfully") {
        setOtpVerified(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Invalid OTP");
    }
  }

  // Step 2: create password after OTP is verified
  async function handleCreatePassword() {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        {
          username: email.split("@")[0],
          email,
          password,
          confirmPassword,
        }
      );

      if (res.data.status === "success") {
        alert("Signup successful 🎉");
        modalManage("pin"); // proceed to PIN modal
      }
    } catch (err) {
      alert(err.response?.data?.message || "Error creating password");
    }
  }

  return (
    <div className="col-span-3 p-8 flex flex-col gap-4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-gray-400 hover:text-black text-xl hover:z-30"
      >
        &times;
      </button>

      <h3 className="text-xl font-semibold">Welcome to INVESTnow</h3>
      <h3 className="text-xs text-green-400">YOUR EMAIL ADDRESS</h3>

      <div className="relative w-full" onClick={() => setEmailOtpSend(false)}>
        <input
          type="email"
          value={email}
          readOnly
          className="border rounded-md p-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
        />
        <Pen className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer" />
      </div>

      {!otpVerified ? (
        <>
          <h3 className="text-sm text-green-400">ENTER YOUR OTP</h3>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </button>
        </>
      ) : (
        <>
          <h3 className="text-sm text-green-400">CREATE PASSWORD</h3>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
            onClick={handleCreatePassword}
          >
            Create Account
          </button>
        </>
      )}
    </div>
  );
}

export default Otpwindow;
