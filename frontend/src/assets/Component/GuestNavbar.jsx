import Navbar from "./Navbar";
import Button from "./Button";
import { useModal } from "../../../Context/ModalContext";

function GuestNavbar() {
  const { setModal } = useModal();

  return (
    <nav>
      <Navbar>
        <Button clickManage={() => setModal("login")}>Login/Signup</Button>
      </Navbar>
    </nav>
  );
}

export default GuestNavbar;
