function SearchModal({ setIsOpen }) {
  const popular = [
    "OLA Electric Mobility Ltd.",
    "Tata Motors Ltd.",
    "National Securities Depository Ltd.",
    "Suzlon Energy Ltd.",
    "Rico Auto Industries Ltd.",
    "Reliance Power Ltd.",
  ];

  return (
    <div>
      <div className="absolute top-full right-1/2 w-[500px] bg-white shadow-xl rounded-xl p-4 z-50">
        <div className="flex space-x-3 mb-4 text-sm text-gray-600">
          <button className="px-3 py-1 rounded-full bg-gray-200 text-black">
            All
          </button>
          <button className="px-3 py-1 rounded-full hover:bg-gray-100">
            Stocks
          </button>
          <button className="px-3 py-1 rounded-full hover:bg-gray-100">
            F&O
          </button>
          <button className="px-3 py-1 rounded-full hover:bg-gray-100">
            Mutual Funds
          </button>
          <button className="px-3 py-1 rounded-full hover:bg-gray-100">
            ETF
          </button>
          <button className="px-3 py-1 rounded-full hover:bg-gray-100">
            FAQs
          </button>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            Popular on Groww
          </p>
          <ul className="space-y-2">
            {popular.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-black"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default SearchModal;
