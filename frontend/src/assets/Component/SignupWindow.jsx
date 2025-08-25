function SignupWindow({ email, setEmail, onClose, login, setEmailOtpSend }) {
  return (
    <div className="col-span-3 p-8 flex flex-col gap-4 relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-gray-400 hover:text-black text-xl hover:z-30"
      >
        &times;
      </button>
      <h3 className="text-xl font-semibold">Welcome to INVESTnow</h3>
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
      <input
        type="email"
        placeholder="Your Email Address"
        value={email}
        className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        onClick={() => {
          if (email.trim()) {
            setEmailOtpSend(true);
          }
        }}
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
