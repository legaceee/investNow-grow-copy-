import qr from "../../../public/My_QR_Code_1-1024.JPEG";
import preview from "../../../public/generated-image.png";
export default function MiddleModal() {
  return (
    <div className="flex justify-center items-center w-full mt-10">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-5xl w-full grid grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900 text-center">
            INVESTnoww lets you invest as an individual or a HUF
          </h2>

          {/* QR Code */}
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-gray-600">
              Scan here for individual account
            </p>
            <img src={qr} alt="QR Code" className="w-40 h-40" />
            <div className="flex gap-3 text-gray-500 text-2xl">
              <i className="fa-brands fa-google-play"></i>
              <i className="fa-brands fa-apple"></i>
            </div>
          </div>

          {/* SMS input */}
          <div className="w-full">
            <p className="text-sm text-gray-600 mb-2">
              Get an SMS for app link (for individual account)
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="+91 9999988888"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
                SEND LINK
              </button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex justify-center items-center">
          <img
            src={preview}
            alt="App Preview"
            className="max-h-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
}
