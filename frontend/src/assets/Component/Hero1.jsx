import buildinggroww from "../../../public/buildinggroww.webp";
import phonegroww from "../../../public/phonegroww.webp";

function Hero1() {
  /* useGSAP(() => {
    gsap.to(".aman", { x: 200, duration: 2, ease: "bounce.out" });
  }, []); // Empty dependency array = runs once on mount
  function onclick() {
    console.log("Button clicked!");
  } */

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between gap-10 mt-10 py-16 bg-white">
      <div className="flex flex-col pt-2">
        <img
          src={buildinggroww}
          alt="Building Groww"
          className="w-16 h-16 sm:w-24 sm:h-24"
        />
        <h2 className="text-3xl sm:text-5xl lg:text-[60px] font-semibold text-slate-700 leading-tight mt-3">
          Indian markets
          <br />
          at your fingertip
        </h2>

        <ul className="flex flex-col gap-4 text-base sm:text-[20px] font-semibold mt-8 rounded-sm max-w-md">
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
      <div className="flex justify-center lg:justify-end">
        <img
          src={phonegroww}
          alt="Groww Phone"
          className="w-48 sm:w-64 mt-2 sm:mt-10"
        />
      </div>
    </div>
  );
}

export default Hero1;
