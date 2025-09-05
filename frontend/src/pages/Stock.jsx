// import { NavLink, useParams } from "react-router-dom";
// import AuthNavbar from "../assets/Component/AuthNavbar";
// import Performance from "../assets/Component/Performance";

// function Stock() {
//   const { name } = useParams();

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Navbar */}
//       <AuthNavbar />

//       {/* Page container */}
//       <div className="max-w-7xl mx-auto px-6 mt-20">
//         {/* Notice Bar */}
//         <div className="flex justify-between items-center border rounded-md p-3 text-sm bg-gray-50">
//           <p>The current prices are delayed, activate stocks for live prices</p>
//           <NavLink to={"/"} className="text-green-600 font-medium">
//             Activate Stocks
//           </NavLink>
//         </div>

//         {/* Main Top Section */}
//         <div className="flex mt-8 gap-8">
//           {/* Left Section */}
//           <div className="flex-1">
//             {/* Stock Info */}
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-md text-lg font-bold">
//                 {name?.[0] || "S"}
//               </div>
//               <div>
//                 <h1 className="text-2xl font-semibold">{name}</h1>
//                 <p className="text-gray-500">X</p>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="mt-4">
//               <p className="text-4xl font-bold">₹59.92</p>
//               <p className="text-red-500 text-sm">-4.58 (7.10%) 1D</p>
//             </div>

//             {/* OHLC */}
//             <div className="flex gap-6 mt-4 text-sm text-gray-700">
//               <p>
//                 O <span className="text-black">59.80</span>
//               </p>
//               <p>
//                 H <span className="text-black">59.99</span>
//               </p>
//               <p>
//                 L <span className="text-black">59.72</span>
//               </p>
//               <p>
//                 C <span className="text-black">59.92</span>
//               </p>
//             </div>

//             {/* Chart */}
//             <div className="mt-6 h-80 bg-gray-100 border rounded-md flex items-center justify-center">
//               <p className="text-gray-500">[Candlestick Chart]</p>
//             </div>

//             {/* Timeframes */}
//             <div className="flex gap-3 mt-4">
//               {["1D", "1W", "1M", "3M", "6M", "1Y", "3Y", "5Y", "All"].map(
//                 (t) => (
//                   <button
//                     key={t}
//                     className="px-3 py-1 border rounded-md text-sm hover:bg-gray-100"
//                   >
//                     {t}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="w-80">
//             <div className="border rounded-lg p-6 bg-gray-50 text-center">
//               <p className="text-lg font-medium mb-2">
//                 Looking to invest in Stocks?
//               </p>
//               <p className="text-sm text-gray-600 mb-4">
//                 Create your demat account on Groww in 2 minutes
//               </p>
//               <button className="w-full bg-green-600 text-white py-2 rounded-md">
//                 Unlock Stocks
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex mt-10 gap-8 border-b">
//           <div className="text-xl border-b-4 border-green-500 pb-2">
//             Overview
//           </div>
//           <div className="text-xl pb-2">News</div>
//           <div className="text-xl pb-2">Events</div>
//         </div>

//         {/* Performance Section */}
//         <Performance />
//       </div>
//     </div>
//   );
// }

// export default Stock;

import { NavLink, useParams } from "react-router-dom";
import AuthNavbar from "../assets/Component/AuthNavbar";
import Performance from "../assets/Component/Performance";
import Footer from "../assets/Component/Footer";

function Stock() {
  const { name } = useParams();

  return (
    <div className="bg-white min-h-screen">
      {/* Navbar */}
      <AuthNavbar />

      {/* Page container */}
      <div className="max-w-7xl mx-auto px-6 mt-20 mb-6">
        {/* Notice Bar */}
        <div className="flex justify-between items-center border rounded-md p-3 text-sm bg-gray-50">
          <p>The current prices are delayed, activate stocks for live prices</p>
          <NavLink to={"/"} className="text-green-600 font-medium">
            Activate Stocks
          </NavLink>
        </div>

        {/* Main Section (Left + Right) */}
        <div className="flex mt-8 gap-8">
          {/* Left Section */}
          <div className="flex-1">
            {/* Stock Info */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-md text-lg font-bold">
                {name?.[0] || "S"}
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{name}</h1>
                <p className="text-gray-500">X</p>
              </div>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-4xl font-bold">₹59.92</p>
              <p className="text-red-500 text-sm">-4.58 (7.10%) 1D</p>
            </div>

            {/* OHLC */}
            <div className="flex gap-6 mt-4 text-sm text-gray-700">
              <p>
                O <span className="text-black">59.80</span>
              </p>
              <p>
                H <span className="text-black">59.99</span>
              </p>
              <p>
                L <span className="text-black">59.72</span>
              </p>
              <p>
                C <span className="text-black">59.92</span>
              </p>
            </div>

            {/* Chart */}
            <div className="mt-6 h-80 bg-gray-100 border rounded-md flex items-center justify-center">
              <p className="text-gray-500">[Candlestick Chart]</p>
            </div>

            {/* Timeframes */}
            <div className="flex gap-3 mt-4">
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

            {/* Tabs */}
            <div className="flex mt-10 gap-8 border-b">
              <div className="text-xl border-b-4 border-green-500 pb-2">
                Overview
              </div>
              <div className="text-xl pb-2">News</div>
              <div className="text-xl pb-2">Events</div>
            </div>

            {/* Performance Section */}
            <Performance />
          </div>

          {/* Right Section */}
          <div className="w-80">
            <div className="border rounded-lg p-6 bg-gray-50 text-center ">
              <p className="text-lg font-medium mb-2">
                Looking to invest in Stocks?
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Create your demat account on Groww in 2 minutes
              </p>
              <button className="w-full bg-green-600 text-white py-2 rounded-md">
                Unlock Stocks
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer path={["home", "stocks", name]} />
    </div>
  );
}

export default Stock;
