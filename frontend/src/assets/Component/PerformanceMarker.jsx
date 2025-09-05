function PerformanceMarker() {
  return (
    <div className="flex-1 mx-4 relative">
      <div className="h-1 bg-gray-200 rounded-full w-full"></div>
      {/* Example marker */}
      <div className="absolute top-[-4px] left-1/2 transform -translate-x-1/2">
        ▲
      </div>
    </div>
  );
}

export default PerformanceMarker;
