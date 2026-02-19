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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          <div className="h-56 sm:h-64 bg-slate-500 rounded-2xl transition-all duration-500 hover:-translate-y-6 hover:z-10 lg:-rotate-6 hover:rotate-0">
            1
          </div>
          <div className="h-48 sm:h-56 bg-red-400 rounded-2xl transition-all duration-500 hover:-translate-y-6 hover:z-10 lg:rotate-3 hover:rotate-0">
            2
          </div>
          <div className="h-48 sm:h-56 bg-slate-500 rounded-2xl transition-all duration-500 hover:-translate-y-6 hover:z-10">
            3
          </div>
          <div className="h-56 sm:h-72 bg-orange-300 rounded-2xl transition-all duration-500 hover:-translate-y-6 hover:z-10 lg:rotate-6 hover:rotate-0">
            4
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero4;
