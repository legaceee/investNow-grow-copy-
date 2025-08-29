import { GraduationCap } from "lucide-react";
function Hero3() {
  return (
    <div className=" flex flex-col items-center mt-40">
      <GraduationCap
        size={64} // You can use 64 or adjust as needed
        className=" stroke-white stroke-[2]"
        fill="black"
      />
      <p className="text-[60px] font-semibold text-slate-700 mt-4">
        finance simplified,<br></br> In your language!
      </p>
      <div className="flex justify-between ">
        <button className="rounded-full  bg-white text-black mt-6 p-4 border border-gray-300 w-44 h-14   hover:shadow-2xl transition  mr-8">
          youtube
        </button>
        <button className="rounded-full  bg-white text-black mt-6 p-4 border border-gray-300 w-44 h-14   hover:shadow-2xl transition">
          Tutorial
        </button>
      </div>
    </div>
  );
}

export default Hero3;
