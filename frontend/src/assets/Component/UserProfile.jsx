import {
  Settings,
  LogOut,
  FileText,
  Headphones,
  ClipboardList,
  Wallet,
} from "lucide-react";

export default function UserProfile() {
  return (
    <div className="w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-4">
      {/* User info */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-gray-900">aman pandey</p>
          <p className="text-gray-500 text-xs">a***********s@gmail.com</p>
        </div>
        <Settings className="w-4 h-4 text-gray-500 cursor-pointer" />
      </div>

      <hr className="my-2" />

      {/* Menu items */}
      <div className="flex flex-col space-y-2">
        <button className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm">
          <Wallet className="w-4 h-4" />
          <span>Stocks, F&O balance</span>
        </button>

        <button className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm">
          <ClipboardList className="w-4 h-4" />
          <span>All Orders</span>
        </button>

        <button className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm">
          <Headphones className="w-4 h-4" />
          <span>24 x 7 Customer Support</span>
        </button>

        <button className="flex items-center gap-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg text-sm">
          <FileText className="w-4 h-4" />
          <span>Reports</span>
        </button>
      </div>

      <hr className="my-2" />

      {/* Footer */}
      <div className="flex items-center justify-between px-1">
        <button className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-2 py-1 rounded-lg text-sm">
          <Settings className="w-4 h-4" />
          <span>Theme</span>
        </button>
        <button className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg text-sm">
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
}
