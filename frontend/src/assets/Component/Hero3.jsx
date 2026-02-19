import { GraduationCap } from "lucide-react";
function Hero3() {
  return (
    <div className="flex flex-col items-center mt-20 sm:mt-40 text-center">
      <GraduationCap
        size={64} // You can use 64 or adjust as needed
        className=" stroke-white stroke-[2]"
        fill="black"
      />
      <p className="text-3xl sm:text-5xl lg:text-[60px] font-semibold text-slate-700 mt-4 leading-tight">
        finance simplified,<br></br> In your language!
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        <button className="rounded-full bg-white text-black p-4 border border-gray-300 w-40 sm:w-44 h-12 sm:h-14 hover:shadow-2xl transition">
          youtube
        </button>
        <button className="rounded-full bg-white text-black p-4 border border-gray-300 w-40 sm:w-44 h-12 sm:h-14 hover:shadow-2xl transition">
          Tutorial
        </button>
      </div>
    </div>
  );
}

export default Hero3;
