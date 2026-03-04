// components/shipping/ShipmentTimeline.tsx

import { TimelineStep } from "@/types/shipping";

type Props = { steps: TimelineStep[] };

export default function ShipmentTimeline({ steps }: Props) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full">
            <h2 className="text-sm font-semibold text-gray-800 mb-5">Shipment Timeline</h2>
            <div className="relative">
                {steps.map((step, i) => {
                    const isLast = i === steps.length - 1;
                    return (
                        <div key={step.label} className="relative flex gap-3">
                            {!isLast && (
                                <div className="absolute left-[9px] top-[22px] w-[2px] h-full bg-gray-100 z-0" />
                            )}
                            <div className="relative z-10 flex-shrink-0 mt-0.5">
                                {step.completed ? (
                                    <div className="w-[18px] h-[18px] rounded-full bg-green-500 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                ) : step.active ? (
                                    <div className="w-[18px] h-[18px] rounded-full bg-blue-500 ring-4 ring-blue-100 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    </div>
                                ) : (
                                    <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-200 bg-white" />
                                )}
                            </div>
                            <div className={`flex-1 flex items-start justify-between ${isLast ? "pb-0" : "pb-5"}`}>
                                <div>
                                    <p className={`text-sm font-medium leading-tight
                    ${step.completed ? "text-gray-800" : step.active ? "text-blue-600" : "text-gray-400"}`}>
                                        {step.label}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                                </div>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-2 mt-0.5
                  ${step.completed ? "border-blue-200" : "border-gray-200"}`}>
                                    <div className={`w-2 h-2 rounded-full ${step.completed ? "bg-blue-400" : "bg-gray-300"}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}