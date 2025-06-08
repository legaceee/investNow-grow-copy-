import React, { useState } from "react";
import Navbar from "../assets/Component/Navbar";

import growwhero from "../../public/growwhero.png";
import Hero1 from "../assets/Component/Hero1";
import Hero2 from "../assets/Component/hero2";
import Hero3 from "../assets/Component/Hero3";
import Hero4 from "../assets/Component/Hero4";
import Login from "./Login";

function Home() {
  const [clicked, setIsClicked] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <Navbar clicked={clicked} clickManage={setIsClicked} />
        <div className="flex flex-col  justify-center mt-28 text-center bg-white">
          <h2 className="text-[75px]  font-semibold text-slate-700">
            All things finance,
            <br /> Right here!
          </h2>
          <h1 className="decoration-slate-400 text-xl text-slate-700">
            Built for growing india
          </h1>
        </div>
        <div className="flex items-center justify-center mt-3">
          <button className="rounded-md p-3 bg-green-400 text-white">
            Get Started
          </button>
        </div>
        <div>
          <img src={growwhero} alt="Groww Hero" className="w-full  mt-3" />
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-slate-700 mb-4">
              {" "}
              best brokerage
            </h2>
            <p className="text-lg text-slate-600">
              Invest in stocks, mutual funds, and more with the best brokerage
              rates.
            </p>
          </div>
        </div>
      </div>
      {clicked ? <Login /> : ""}
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
