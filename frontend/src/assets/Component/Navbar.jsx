import { useEffect, useRef, useState } from "react";
import { useModal } from "../../../Context/ModalContext";
import Button from "./Button";

export default function Navbar({ children }) {
  const { setModal } = useModal();
  const [query, setQuery] = useState("");
  const inputEl = useRef(null);

  // Handle global shortcut Ctrl+K
  useEffect(() => {
    function onKey(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        console.log("Ctrl+K detected");
        setModal("search");
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setModal]);

  return (
    <nav className="bg-white p-4 z-50">
      <div className="flex justify-around items-center fixed top-0 left-0 right-0 z-50 bg-white p-4">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-lg font-bold">
            INVEST<span className="text-green-500">now</span>
          </h1>
          <ul className="flex space-x-4 ml-6">
            <li className="font-bold">Stocks</li>
            <li>Crypto</li>
            <li>Mutual Funds</li>
            <li>Commodities</li>
          </ul>
        </div>

        <div className="relative ml-20 flex items-center">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search INVESTnow..."
            className="block w-96 pl-3 pr-16 py-2 border border-gray-300 rounded-lg
                       leading-5 bg-white placeholder-gray-500 focus:outline-none
                       focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onFocus={() => {
              setModal("search");
              setTimeout(() => inputEl.current?.blur(), 0);
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="absolute right-3 text-gray-400 text-sm pointer-events-none">
            Ctrl + K
          </span>
        </div>

        {/* Right-side actions (Login button etc.) */}
        <div className="flex items-center mr-10">{children}</div>
      </div>
    </nav>
  );
}
