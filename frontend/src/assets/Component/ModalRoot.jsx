// components/ModalRoot.jsx
import ReactDOM from "react-dom";
import { useModal } from "../context/ModalContext";
import Login from "../pages/Login";
import SearchModal from "./SearchModal";
import PinModal from "./PinModal";

function ModalRoot() {
  const { modal, setModal } = useModal();

  if (!modal) return null;

  const onClose = () => setModal(null);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
      {modal === "login" && <Login onClose={onClose} />}
      {modal === "search" && <SearchModal onClose={onClose} />}
      {modal === "pin" && <PinModal onClose={onClose} />}
    </div>,
    document.body
  );
}

export default ModalRoot;
