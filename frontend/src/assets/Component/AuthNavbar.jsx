import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Avatar, { genConfig } from "react-nice-avatar";
import UserProfile from "./UserProfile";

function AuthNavbar() {
  const [clicked, setClicked] = useState(false);
  const config = genConfig();
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setClicked(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <Navbar>
        <div className="relative" ref={dropdownRef}>
          {/* Avatar button */}
          <div
            className="cursor-pointer"
            onClick={() => setClicked((prev) => !prev)}
          >
            <Avatar style={{ width: "2rem", height: "2rem" }} {...config} />
          </div>

          {/* Dropdown */}
          {clicked && (
            <div className="absolute right-0 mt-2 z-50">
              <UserProfile />
            </div>
          )}
        </div>
      </Navbar>
    </div>
  );
}

export default AuthNavbar;
