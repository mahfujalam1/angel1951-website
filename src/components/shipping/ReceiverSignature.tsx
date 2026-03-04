// components/shipping/ReceiverSignature.tsx
import { Square } from "lucide-react";

type Props = { signed?: boolean };

export default function ReceiverSignature({ signed = false }: Props) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mt-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-semibold text-gray-800">Receiver Signature</h2>
                    <p className="text-xs text-gray-400 mt-0.5">{signed ? "Signed" : "Pending"}</p>
                </div>
                <div className={`w-7 h-7 rounded border-2 flex items-center justify-center transition
          ${signed ? "bg-blue-500 border-blue-500" : "border-gray-300 bg-white"}`}>
                    {signed && <div className="w-3 h-3 bg-white rounded-sm" />}
                </div>
            </div>
        </div>
    );
}