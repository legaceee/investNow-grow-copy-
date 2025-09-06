import { useState } from "react";
import axios from "axios";

function SignupWindow({ setEmail, onClose, login, setEmailOtpSend }) {
  const [inputEmail, setInputEmail] = useState("");

  async function handleContinue() {
    try {
      // Step 1: Call backend to send OTP
      const res = await axios.post(
        "http://localhost:4000/api/v1/users/send-otp",
        {
          email: inputEmail,
        }
      );

      if (res.status === 200) {
        // Step 2: Save email for OTP window (pass to parent)
        setEmail(inputEmail);
        // Step 3: Open OTP modal
        setEmailOtpSend(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Error sending OTP");
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

      {/* Google login button */}
      <button
        className="border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
        onClick={login}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <p className="text-center text-sm text-gray-500">or</p>

      {/* Email input - controlled by local state */}
      <input
        type="email"
        placeholder="Your Email Address"
        value={inputEmail}
        onChange={(e) => setInputEmail(e.target.value)}
        className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
      />

      <button
        className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        onClick={handleContinue}
      >
        Continue
      </button>

      <p className="text-xs text-gray-400 mt-2">
        By proceeding, I agree to <span className="underline">T&C</span>,{" "}
        <span className="underline">Privacy Policy</span> &{" "}
        <span className="underline">Tariff Rates</span>
      </p>
    </div>
  );
}

export default SignupWindow;

// import { useState } from "react";
// import axios from "axios";

// function SignupWindow({ setEmailOtpSend, setEmail, modalManage }) {
//   const [inputEmail, setInputEmail] = useState("");

//   async function handleContinue() {
//     try {
//       // Step 1: Call backend to send OTP
//       const res = await axios.post(
//         "http://localhost:4000/api/v1/users/send-otp",
//         {
//           email: inputEmail,
//         }
//       );

//       if (res.status === 200) {
//         // Step 2: Save email for OTP window
//         setEmail(inputEmail);
//         // Step 3: Open OTP modal
//         setEmailOtpSend(true);
//       }
//     } catch (err) {
//       alert(err.response?.data?.error || "Error sending OTP");
//     }
//   }

//   return (
//     <div className="col-span-3 p-8 flex flex-col gap-4">
//       <h3 className="text-xl font-semibold">Create your account</h3>
//       <h3 className="text-xs text-green-400">EMAIL ADDRESS</h3>

//       <input
//         type="email"
//         value={inputEmail}
//         onChange={(e) => setInputEmail(e.target.value)}
//         placeholder="Enter your email"
//         className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
//       />

//       <button
//         className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
//         onClick={handleContinue}
//       >
//         Continue
//       </button>
//     </div>
//   );
// }

// export default SignupWindow;
