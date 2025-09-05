function Performance() {
  return (
    <div className="pt-8 flex flex-col">
      <p className="text-2xl font-semibold mb-4">Performance !</p>

      <div className="flex flex-col gap-4">
        {/* Row 1 */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <div className="text-gray-500">TODAY'S LOW</div>
            <div>xrs</div>
          </div>

          {/* Divider */}
          <div className="border-b-2 border-black"></div>

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
          <hr />

          <div className="flex flex-col">
            <div className="text-gray-500">52W HIGH</div>
            <div>xrs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance;
