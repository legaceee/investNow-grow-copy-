import { LogIn, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Login from "../../pages/Login";

function Navbar({ clicked, clickManage }) {
  const [query, setQuery] = useState("");

  console.log(clicked, clickManage);
  const inputEl = useRef(null);
  useEffect(function () {
    function callback(e) {
      console.log(e.code);
      if (document.activeElement === inputEl.current) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputEl.current.focus();
        setQuery("");
      }
    }
    document.addEventListener("keydown", callback);

    //cleanup function
    return () => document.removeEventListener("keydown", callback);
  }, []);
  console.log(clicked);
  return (
    <>
      <nav className="bg-white p-4 z-20">
        <div className="flex justify-around items-center fixed top-0 left-0 right-0 z-50 bg-white p-4">
          {/* Logo Section */}
          <div className="flex items-center">
            <h1 className="text-lg font-bold">
              INVEST<span className="text-green-500">now</span>
            </h1>
            <ul className="flex space-x-4 ml-6">
              <li className="font-bold">Stocks</li>
              <li>crypto</li>
              <li>Mutual Funds</li>
              <li>Commodities</li>
            </ul>
          </div>
          {/* Centered Input Field */}{" "}
          <div className="relative ml-20 flex ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              ref={inputEl}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-96 pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <h2 className="absolute inset-y-0 flex items-center pointer-events-none right-48 font-gray-500 text-sm">
              ctrl+k
            </h2>
            <div className="flex items-center mr-10">
              <button
                className="bg-green-500 text-white rounded-md px-2 py-2 ml-4 hover:z-50"
                onClick={() => clickManage((clicked) => !clicked)}
              >
                Signup/Login
              </button>
            </div>
          </div>
          {/* Button with Spacing */}
          {/*  <div className="flex items-center mr-10">
          <button className="bg-green-500 text-white rounded-md px-2 py-2 ml-4">
            Signup/Login
          </button>
        </div> */}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
