import { useEffect, useRef } from "react";
import { X, Search as SearchIcon } from "lucide-react";
import Modal from "./Modal";

export default function SearchModal({ onClose }) {
  const inputRef = useRef(null);

  // focus the modal input & lock body scroll
  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
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

  const popular = [
    "OLA Electric Mobility Ltd.",
    "Tata Motors Ltd.",
    "National Securities Depository Ltd.",
    "Suzlon Energy Ltd.",
    "Rico Auto Industries Ltd.",
    "Reliance Power Ltd.",
  ];

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
            {popular.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <span className="text-gray-300">↗</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
