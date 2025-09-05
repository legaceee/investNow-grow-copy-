import AuthNavbar from "../assets/Component/AuthNavbar";
import MiddleModal from "../assets/Component/MiddleModal";

function AccountPage() {
  return (
    <div className="overflow-hidden h-screen">
      <AuthNavbar />
      <div className="min-h-screen bg-white mt-20">
        <MiddleModal />
      </div>
    </div>
  );
}

export default AccountPage;
