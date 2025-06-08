/* function Login() {
  return (
    <div className="bg-gray-200">
      <div className="fixed  top-0 left-0 h-[100vh] w-[100vw] z-[1000] ">
        <div className="flex fixed top-1/2 left-1/2 z-[1001] w-[50vw] transform -translate-x-1/2 -translate-y-1/2 bg-gray-200">
          <div className="bg-green-500 h-[500px] w-[400px] border border-green-500 rounded">
            1
          </div>
          <div className="bg-white h-[500px] w-[400px] border border-white rounded">
            2
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
 */

function Login({ clicked, clickManage }) {
  function onClose() {
    clickManage((clicked) => !clicked);
  }
  return (
    <div onClick={onClose}>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="flex w-[90%] max-w-3xl h-[400px] bg-white rounded-xl overflow-hidden shadow-xl animate-scale">
          {/* Left panel */}
          <div className="w-2/5 bg-green-500 text-white flex flex-col justify-center p-6">
            <h2 className="text-2xl font-bold mb-2">Simple, Free</h2>
            <p className="text-xl">Investing.</p>
            <span className="mt-4 font-medium">Mutual Funds</span>
          </div>

          {/* Right panel */}
          <div className="w-3/5 p-8 flex flex-col gap-4 relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-4 text-gray-400 hover:text-black text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold">Welcome to Groww</h3>
            <button className="border border-gray-300 py-2 px-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100">
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
              className="border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
              Continue
            </button>
            <p className="text-xs text-gray-400 mt-2">
              By proceeding, I agree to <span className="underline">T&C</span>,{" "}
              <span className="underline">Privacy Policy</span> &{" "}
              <span className="underline">Tariff Rates</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
