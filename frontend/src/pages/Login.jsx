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
import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import Modal from "../assets/Component/Modal";
import { Pen } from "lucide-react";
import Otpwindow from "../assets/Component/Otpwindow";
import SignupWindow from "../assets/Component/SignupWindow";
function Login({ onClose }) {
  const [emailOtpSend, setEmailOtpSend] = useState(false);
  const [email, setEmail] = useState("");

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      // tokenResponse.access_token can be used to fetch user data
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <div>
      <Modal onClose={onClose}>
        <div
          className="grid grid-cols-5 w-[100%] max-w-3xl h-[400px] bg-white rounded-xl overflow-hidden shadow-xl animate-scale"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left panel */}
          <div className="col-span-2 bg-green-500 text-white flex flex-col justify-center p-8">
            <h2 className="text-2xl font-bold mb-2">Simple, Free</h2>
            <p className="text-xl">Investing.</p>
            <span className="mt-4 font-medium">Mutual Funds</span>
          </div>

          {/* Right panel */}
          {!emailOtpSend ? (
            <SignupWindow
              email={email}
              setEmail={setEmail}
              setEmailOtpSend={setEmailOtpSend}
              onClose={onClose}
              login={login}
            />
          ) : (
            <Otpwindow
              setEmailOtpSend={setEmailOtpSend}
              email={email}
              onClose={onClose}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Login;
