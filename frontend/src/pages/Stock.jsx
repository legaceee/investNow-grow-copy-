import { NavLink, useParams, useLocation } from "react-router-dom";
import AuthNavbar from "../assets/Component/AuthNavbar";
import Performance from "../assets/Component/Performance";
import Footer from "../assets/Component/Footer";
import Button from "../assets/Component/Button";
import { useEffect, useState } from "react";

function Stock() {
  const { id } = useParams(); // symbol from URL
  const location = useLocation();
  const stockObj = location.state?.stock; // full object if passed
  const [stockInfo, setStockInfo] = useState(stockObj || {});
  useEffect(() => {
    if (id) {
      async function getStock() {
        try {
          const res = await fetch(
            `http://localhost:4000/api/v1/stocks/sym/${id}`
          );
          const data = await res.json();
          console.log(data.data.stock);
          const stockData = data.data.stock;

          const chartRes = await fetch(
            `http://localhost:4000/api/v1/candle/${stockData.id}/candles?interval=1m`
          );
          const candleData = await chartRes.json();

          setStockInfo({
            ...stockData,
            candles: candleData.data.candles.slice(0, 5),
          });

          console.log("Stock + Candles:", {
            ...stockData,
            candles: candleData.data.candles.slice(0, 5),
          });
        } catch (err) {
          console.error(err);
        }
      }
      getStock();
    }
  }, [id]);

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <AuthNavbar />

      {/* Page container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-20 mb-6">
        {/* Notice Bar */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border rounded-md p-3 text-sm bg-gray-50">
          <p>The current prices are delayed, activate stocks for live prices</p>
          <NavLink to={"/"} className="text-green-600 font-medium">
            Activate Stocks
          </NavLink>
        </div>

        {/* Main Section */}
        <div className="flex flex-col lg:flex-row mt-8 gap-8">
          {/* Left Section */}
          <div className="flex-1">
            {/* Stock Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-md text-lg font-bold">
                {id?.[0] || "S"}
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{id}</h1>
                <p className="text-gray-500">{stockInfo.companyName}</p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-4xl font-bold">
                ₹{stockInfo.currentPrice ?? "--"}
              </p>
              <p className="text-red-500 text-sm">-4.58 (7.10%) 1D</p>
            </div>

            {/* OHLC */}
            {/* <div className="flex gap-6 mt-4 text-sm text-gray-700">
              <p>
                O{" "}
                <span className="text-black">{stockInfo.candles[0].open}</span>
              </p>
              <p>
                H{" "}
                <span className="text-black">{stockInfo.candles[0].high}</span>
              </p>
              <p>
                L <span className="text-black">{stockInfo.candles[0].low}</span>
              </p>
              <p>
                C{" "}
                <span className="text-black">{stockInfo.candles[0].close}</span>
              </p>
            </div> */}

            {/* Chart */}
            <div className="mt-6 h-64 sm:h-80 bg-gray-100 border rounded-md flex items-center justify-center">
              <p className="text-gray-500">[Candlestick Chart]</p>
            </div>

            {/* Timeframes */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4">
              {["1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "All"].map(
                (t) => (
                  <button
                    key={t}
                    className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
                  >
                    {t}
                  </button>
                )
              )}
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button>BUY</Button>
              <Button>SELL</Button>
            </div>

            {/* Tabs */}
            <div className="flex mt-10 gap-6 sm:gap-8 border-b overflow-x-auto">
              <div className="text-base sm:text-xl whitespace-nowrap border-b-4 border-green-500 pb-2">
                Overview
              </div>
              <div className="text-base sm:text-xl whitespace-nowrap pb-2">News</div>
              <div className="text-base sm:text-xl whitespace-nowrap pb-2">Events</div>
            </div>

            {/* Performance Section */}
            <Performance />
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-80">
            <div className="border rounded-lg p-6 bg-gray-50 text-center ">
              <p className="text-lg font-medium mb-2">
                Looking to invest in Stocks?
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Create your demat account on INVESTnoww in 2 minutes
              </p>
              <button className="w-full bg-green-600 text-white py-2 rounded-md">
                Unlock Stocks
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer path={["home", "stocks", id]} />
    </div>
  );
}

export default Stock;
