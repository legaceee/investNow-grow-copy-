import Navbar from "./Navbar";
import Avatar, { genConfig } from "react-nice-avatar";
function AuthNavbar() {
  const config = genConfig();
  return (
    <div>
      <Navbar>
        <div className="flex">
          <Avatar style={{ width: "2rem", height: "2rem" }} {...config} />
        </div>
      </Navbar>
    </div>
  );
}

export default AuthNavbar;
