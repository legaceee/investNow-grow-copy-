import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useModal } from "../../Context/ModalContext";
import Modal from "../assets/Component/Modal";
import Otpwindow from "../assets/Component/Otpwindow";
import SignupWindow from "../assets/Component/SignupWindow";

function Login() {
  const [emailOtpSend, setEmailOtpSend] = useState(false);
  const [email, setEmail] = useState("");

  const { closeModal, openModal } = useModal();

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
    <Modal onClose={closeModal}>
      <div
        className="grid grid-cols-1 sm:grid-cols-5 w-full max-w-3xl bg-white rounded-xl overflow-hidden shadow-xl animate-scale sm:h-[400px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left panel */}
        <div className="sm:col-span-2 bg-green-500 text-white flex flex-col justify-center p-6 sm:p-8">
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
            onClose={closeModal}
            login={login}
          />
        ) : (
          <Otpwindow
            setEmailOtpSend={setEmailOtpSend}
            email={email}
            onClose={closeModal}
            onVerify={() => {
              openModal("pin");
            }}
          />
        )}
      </div>
    </Modal>
  );
}

export default Login;
