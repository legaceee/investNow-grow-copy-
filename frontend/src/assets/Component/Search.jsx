import { useState, useRef, useEffect } from "react";
import SearchModal from "./SearchModal";
function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const inputEl = useRef(null);
  useEffect(function () {
    function callback(e) {
      console.log(e.code);
      if (document.activeElement === inputEl.current) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputEl.current.focus();
        // setQuery("");
      }
    }
    document.addEventListener("keydown", callback);

    //cleanup function
    return () => document.removeEventListener("keydown", callback);
  }, []);

  const popular = [
    "OLA Electric Mobility Ltd.",
    "Tata Motors Ltd.",
    "National Securities Depository Ltd.",
    "Suzlon Energy Ltd.",
    "Rico Auto Industries Ltd.",
    "Reliance Power Ltd.",
  ];

  return (
    <div className=" relative inset-0 z-40">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-80">
        <input
          type="text"
          placeholder="Search Groww..."
          className="bg-transparent outline-none w-full"
          ref={inputEl}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && <SearchModal setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Search;
