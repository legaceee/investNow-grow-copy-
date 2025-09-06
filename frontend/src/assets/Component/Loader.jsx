import { Loader2 } from "lucide-react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-10">
      <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
      <p className="mt-2 text-sm text-gray-600">{text}</p>
    </div>
  );
}
