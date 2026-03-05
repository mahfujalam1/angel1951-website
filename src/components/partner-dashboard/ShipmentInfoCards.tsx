import { ShipmentDetail } from "@/types/shipment.types";

export default function ShipmentInfoCards({ data }: { data: ShipmentDetail }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Routing */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Routing information</h3>
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-xs text-gray-400 mb-0.5">Origin:</p>
                        <p className="text-sm font-semibold text-gray-800">{data.routing.origin}</p>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div>
                        <p className="text-xs text-gray-400 mb-0.5">Destination:</p>
                        <p className="text-sm font-semibold text-gray-800">{data.routing.destination}</p>
                    </div>
                </div>
            </div>

            {/* Sender */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Sender information</h3>
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{data.sender.name}</p>
                        <p className="text-sm text-gray-600">{data.sender.phone}</p>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Pick up address:</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{data.sender.pickupAddress}</p>
                    </div>
                </div>
            </div>

            {/* Receiver */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Receiver information</h3>
                <div className="flex flex-col gap-3">
                    <div>
                        <p className="text-sm font-semibold text-gray-800">{data.receiver.name}</p>
                        <p className="text-sm text-gray-600">{data.receiver.phone}</p>
                    </div>
                    <div className="h-px bg-gray-100" />
                    <div>
                        <p className="text-xs text-gray-400 mb-1">Delivery address:</p>
                        <p className="text-sm text-gray-700 leading-relaxed">{data.receiver.deliveryAddress}</p>
                    </div>
                </div>
            </div>

            {/* Package */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Package information</h3>
                <div className="flex flex-col gap-2">
                    {[
                        { label: "Type", value: data.package.type },
                        { label: "Weight", value: data.package.weight },
                        { label: "Dimensions", value: data.package.dimensions },
                        { label: "Quantity", value: String(data.package.quantity) },
                        { label: "Note", value: data.package.note },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-start gap-2">
                            <span className="text-xs text-gray-400 shrink-0">{label}</span>
                            <span className="text-sm text-gray-800 font-medium text-right">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}