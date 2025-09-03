import Navbar from "./Navbar";
import Button from "./Button";
import { useModal } from "../../../Context/ModalContext";

function GuestNavbar() {
  const { setModal } = useModal;
  const modalManage = setModal;
  return (
    <nav>
      <Navbar>
        <Button clickManage={() => modalManage("login")}>Login/Signup</Button>
      </Navbar>
    </nav>
  );
}

export default GuestNavbar;
