import AuthNavbar from "../assets/Component/AuthNavbar";
import MiddleModal from "../assets/Component/MiddleModal";

function AccountPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <AuthNavbar />
      <div className="min-h-screen pt-20">
        <MiddleModal />
      </div>
    </div>
  );
}

export default AccountPage;
