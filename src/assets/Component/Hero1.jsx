import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import buildinggroww from "../../../public/buildinggroww.webp";
import phonegroww from "../../../public/phonegroww.webp";
import { useState } from "react";

function Hero1() {
  /* useGSAP(() => {
    gsap.to(".aman", { x: 200, duration: 2, ease: "bounce.out" });
  }, []); // Empty dependency array = runs once on mount
  function onclick() {
    console.log("Button clicked!");
  } */

  return (
    <div className="flex justify-between mt-10 pt-[80px] pb-[80px] bg-white">
      <div className="flex flex-col pl-40 pt-10">
        <img src={buildinggroww} alt="Building Groww" className="w-24 h-24" />
        <h2 className="text-[60px] font-semibold text-slate-700">
          Indian markets
          <br />
          at your fingertip
        </h2>

        <ul className="flex flex-col gap-4 text-[20px] font-semibold mt-8 rounded-sm">
          <li className="p-4 border  border-gray-200 rounded-xl hover:shadow-md transition ">
            Stocks & Intraday
          </li>
          <li className="p-4 border border-gray-200 rounded-xl hover:shadow-md">
            Crypto
          </li>
          <li className="p-4 border border-gray-200 rounded-xl hover:shadow-md">
            Mutual Funds
          </li>
        </ul>
      </div>
      <div className="flex ml-40 pr-48">
        <img src={phonegroww} alt="Groww Phone" className="w-64 mt-10 h-100%" />
      </div>
    </div>
  );
}

export default Hero1;
