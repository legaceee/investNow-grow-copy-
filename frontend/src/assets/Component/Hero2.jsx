import creditBuilding from "../../../public/creditBuilding.webp";
function Hero2() {
  return (
    <div className="flex justify-between mt-10 pt-[80px]   pb-[80px] bg-white">
      <div className="">
        <img src={creditBuilding} alt="Groww Phone" className="w-20 mt-10" />
        <h2 className="text-[60px] font-semibold text-slate-700">
          Credit, <br></br>when you need it
        </h2>
        <p className="mt-5">Apply for loan when you need</p>
        <button className="rounded-md p-3 bg-green-400 text-white mt-6">
          know more
        </button>
      </div>
      <div className="flex  justify-between items-center pr-10">
        <div className="border border-gray-200 bg-white rounded-3xl p-4 w-[250px] h-[250px] relative  top-2 bottom-20 left-[470px] shadow-md   ">
          <p>your score</p>
        </div>
        <div className="border border-solid bg-white border-gray-200 rounded-3xl p-4 w-[350px] h-[200px]  relative  top-32 right-2 shadow-md ">
          <p>personal loan</p>
        </div>
      </div>
    </div>
  );
}

export default Hero2;
