import creditBuilding from "../../../public/creditBuilding.webp";
function Hero2() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 py-16 bg-white items-center">
      <div>
        <img
          src={creditBuilding}
          alt="Groww Phone"
          className="w-14 sm:w-20 mt-2"
        />
        <h2 className="text-3xl sm:text-5xl lg:text-[60px] font-semibold text-slate-700 leading-tight mt-3">
          Credit, <br></br>when you need it
        </h2>
        <p className="mt-5 text-sm sm:text-base">
          Apply for loan when you need
        </p>
        <button className="rounded-md p-3 bg-green-400 text-white mt-6">
          know more
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-end">
        <div className="border border-gray-200 bg-white rounded-3xl p-4 w-full sm:w-64 h-56 sm:h-64 shadow-md">
          <p>your score</p>
        </div>
        <div className="border border-solid bg-white border-gray-200 rounded-3xl p-4 w-full sm:w-80 h-48 sm:h-56 shadow-md">
          <p>personal loan</p>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
