import { Pen } from "lucide-react";
function Otpwindow({ setEmailOtpSend, email, onClose }) {
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

      <h3 className="text-sm text-green-400">ENTER YOUR OTP</h3>
      <input
        type="text"
        className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <button
        className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        onClick={() => setEmailOtpSend((emailOtpSend) => !emailOtpSend)}
      >
        verify
      </button>
      <p className="text-xs text-gray-400 mt-2">
        By proceeding, I agree to <span className="underline">T&C</span>,{" "}
        <span className="underline">Privacy Policy</span> &{" "}
        <span className="underline">Tariff Rates</span>
      </p>
    </div>
  );
}

export default Otpwindow;
