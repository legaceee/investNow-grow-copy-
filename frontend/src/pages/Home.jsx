import React, { useState } from "react";
import Navbar from "../assets/Component/Navbar";

import Hero1 from "../assets/Component/Hero1";
import Hero2 from "../assets/Component/Hero2";
import Hero3 from "../assets/Component/Hero3";
import Hero4 from "../assets/Component/Hero4";
import Login from "./Login";
import Hero0 from "../assets/Hero0";
import Search from "../assets/Component/Search";

function Home() {
  const [clicked, setIsClicked] = useState(false);
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Navbar
          clicked={clicked}
          clickManage={setIsClicked}
          isModal={isModal}
          modalManage={setIsModal}
        />
        <Hero0 />
      </div>

      {clicked ? <Login clicked={clicked} clickManage={setIsClicked} /> : ""}
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
