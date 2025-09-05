import PerformanceMarker from "./PerformanceMarker";

function Performance() {
  return (
    // main div
    <div className="pt-8 flex flex-col">
      {/* performance div */}
      <div className="flex flex-col">
        <p className="text-2xl font-semibold mb-4">Performance !</p>

        <div className="flex flex-col gap-4">
          {/* Row 1 */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="text-gray-500">TODAY'S LOW</div>
              <div>xrs</div>
            </div>

            {/* Divider */}
            <PerformanceMarker />

            <div className="flex flex-col">
              <div className="text-gray-500">TODAY'S HIGH</div>
              <div>xrs</div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="text-gray-500">52W LOW</div>
              <div>xrs</div>
            </div>

            {/* Divider */}
            <PerformanceMarker />

            <div className="flex flex-col">
              <div className="text-gray-500">52W HIGH</div>
              <div>xrs</div>
            </div>
          </div>
        </div>
        <hr className="border-t-2 opacity-25 border-dashed border-gray-400 my-4 mt-4" />
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="flex flex-col">
            <p>OPEN</p>
            <p className="text-lg">x</p>
          </div>
          <div className="flex flex-col">
            <p>PREV CLOSE</p>
            <p className="text-lg">x</p>
          </div>
          <div className="flex flex-col">
            <p>VOLUME</p>
            <p className="text-lg">x</p>
          </div>
          <div className="flex flex-col">
            <p>TOTAL TRADED VOLUME</p>
            <p className="text-lg">x</p>
          </div>
          <div className="flex flex-col">
            <p>UPPER CIRCUIT</p>
            <p className="text-lg">x</p>
          </div>
          <div className="flex flex-col">
            <p>LOWER CIRCUIT</p>
            <p className="text-lg">x</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
