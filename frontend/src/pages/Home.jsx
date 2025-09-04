import React from "react";
import Navbar from "../assets/Component/Navbar";

import Hero1 from "../assets/Component/Hero1";
import Hero2 from "../assets/Component/Hero2";
import Hero3 from "../assets/Component/Hero3";
import Hero4 from "../assets/Component/Hero4";
import Login from "./Login";
import Hero0 from "../assets/Hero0";

import SearchModal from "../assets/Component/SearchModal";
import PinModal from "../assets/Component/PinModal";
import GuestNavbar from "../assets/Component/GuestNavbar";
import ModalRoot from "../assets/Component/ModalRoot";

function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        {/* <Navbar isModal={isModal} modalManage={setIsModal} /> */}
        <GuestNavbar />
        <Hero0 />
      </div>

      {/* {isModal === "search" && (
        <SearchModal onClose={() => setIsModal(null)} setIsModal={setIsModal} />
      )}

      {isModal === "login" && (
        <Login
          modalManage={setIsModal}
          onClose={() => setIsModal(null)}
          onClick={() => setIsLogin(true)}
        />
      )}
      {isModal === "pin" && <PinModal />} */}

      <div>
        <Hero1 />
      </div>
      <div className="flex ml-36">
        <Hero2 />
      </div>
      <Hero3 />

      <div>
        <Hero4 />
      </div>
    </>
  );
}

export default Home;
