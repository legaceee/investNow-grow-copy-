import growwhero from "../../public/growwhero.png";
import Button from "./Component/Button";
function Hero0() {
  return (
    <>
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
        <Button>Get Started</Button>
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
    </>
  );
}

export default Hero0;
