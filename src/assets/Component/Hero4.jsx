/* function Hero4() {
  return (
    <div className="relative bg-[#ffffff] py-16">
      <div className="flex justify-center gap-6 px-4 md:px-20 relative z-10">
        <div className="bg-white p-6 w-[250px] rounded-2xl shadow-lg -rotate-6">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">News</h4>
          <p className="text-gray-800 font-medium text-sm">
            More than half of Nifty 50 stocks ended in the green.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            7 Nifty sectors ended in the bank and financial service gaining the
            most...
          </p>
        </div>

        <div className="w-[200px] h-[270px] overflow-hidden rounded-2xl shadow-lg rotate-3">
          <img
            src="yourImage2.webp"
            alt="News face"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-[250px] h-[270px] overflow-hidden rounded-2xl shadow-lg -rotate-2 bg-white">
          <img
            src="yourImage3.webp"
            alt="Market show"
            className="w-full h-full object-cover"
          />
        </div>

    
        <div className="bg-white p-6 w-[250px] rounded-2xl shadow-lg rotate-6">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">
            Word of the day
          </h4>
          <p className="text-gray-800 font-bold text-lg">
            Additional Surveillance Measure
          </p>
          <p className="text-gray-600 text-sm mt-2">
            The Additional Surveillance Measure (ASM) is...
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero4; */

function Hero4() {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-center gap-5 mt-20">
          <div className="h-[250px] w-[200px] bg-slate-500 rounded-2xl  relative  left-36 -rotate-6  hover:relative hover:bottom-28 hover:z-10 hover:rotate-0">
            1
          </div>
          <div className="h-[200px] w-[320px] bg-red-400 rounded-2xl relative top-10 left-16 rotate-3 hover:relative hover:rotate-0 hover:z-10 hover:-top-6">
            2
          </div>
          <div className="h-[200px] w-[320px] bg-slate-500 rounded-2xl relative hover:relative hover:bottom-9">
            3
          </div>
          <div className="w-[250px] h-[30 px] bg-orange-300 rounded-2xl relative  right-40 rotate-6 hover:relative hover:rotate-0 hover:bottom-10 ">
            4
          </div>
        </div>
        <div className="w-full bg-gray-300  h-[600px] z-20 relative bottom-[50px]"></div>
      </div>
    </div>
  );
}

export default Hero4;
