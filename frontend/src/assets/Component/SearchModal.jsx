import { useEffect, useRef } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import Modal from "./Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchModal({ onClose }) {
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [result, setResults] = useState([]);
  const navigate = useNavigate();
  // focus the modal input & lock body scroll
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };
  const handleClick = (stockObj) => {
    navigate(`/stock/${stockObj.symbol}`, { state: { stock: stockObj } });
  };

  useEffect(() => {
    inputRef.current?.focus();
    document.body.classList.add("overflow-hidden");

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);
  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/v1/stocks/${encodeURIComponent(search)}`,
          {
            signal: controller.signal,
          }
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        setResults(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [search]);

  // const popular = [
  //   "OLA Electric Mobility Ltd.",
  //   "Tata Motors Ltd.",
  //   "National Securities Depository Ltd.",
  //   "Suzlon Energy Ltd.",
  //   "Rico Auto Industries Ltd.",
  //   "Reliance Power Ltd.",
  // ];

  return (
    // overlay
    <Modal onClose={onClose}>
      {/* search input */}
      <div
        className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl ring-1 ring-black/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-4 border-b">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search INVESTnow..."
            className="w-full pl-10 pr-10 py-3 rounded-lg outline-none placeholder-gray-400"
            value={search}
            onChange={handleInputChange}
          />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* chips */}
        <div className="px-4 py-3 flex flex-wrap gap-2 text-sm">
          {["All", "Stocks", "F&O", "Mutual Funds", "ETF", "FAQs"].map(
            (t, i) => (
              <button
                key={t}
                className={`px-3 py-1 rounded-full border ${
                  i === 0
                    ? "bg-gray-100 border-gray-200"
                    : "hover:bg-gray-50 border-gray-200"
                }`}
              >
                {t}
              </button>
            )
          )}
        </div>

        {/* list */}
        <div className="px-4 pb-4">
          <p className="text-sm font-medium text-gray-500 mb-2">
            Popular on INVESTnow
          </p>
          <ul className="max-h-72 overflow-auto">
            {result.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleClick(item)}
              >
                <span className="text-gray-300">↗</span>
                <span>{item.companyName}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
