"use client";

import { Parcel, ParcelStatus } from "@/types/hubProvider.types";
import { updateParcelStatus } from "@/lib/api/hubProvider";
import { useState } from "react";

interface Props {
  parcel: Parcel;
  /** Called after the status has been successfully updated */
  onRefresh?: () => void;
}

export default function ParcelCard({ parcel, onRefresh }: Props) {
  const [loading, setLoading] = useState(false);

  const changeStatus = async (newStatus: ParcelStatus) => {
    setLoading(true);
    try {
      await updateParcelStatus(parcel.id, newStatus);
      onRefresh?.();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">{parcel.reference}</h3>
        <span className="text-sm text-gray-600">
          {new Date(parcel.date).toLocaleDateString()}
        </span>
      </div>
      <p className="text-gray-700 mb-3">
        {parcel?.description || "No description"}
      </p>

      {parcel.status === "Awaiting Pickup" && (
        <div className="flex gap-2">
          <button
            onClick={() => changeStatus("Handed Over")}
            disabled={loading}
            className="px-3 py-1 bg-primary text-white rounded hover:opacity-90"
          >
            Yes (Hand Over)
          </button>
          <button
            onClick={() => changeStatus("Handed Over")}
            disabled={loading}
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            No (Cancel)
          </button>
        </div>
      )}

      {parcel.status === "Handed Over" && (
        <button
          onClick={() => changeStatus("Ready for Pickup")}
          disabled={loading}
          className="w-full px-3 py-1 bg-green-600 text-white rounded hover:opacity-90"
        >
          Take Parcel (Ready for Pickup)
        </button>
      )}

      {parcel.status === "Ready for Pickup" && (
        <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
          Ready for Pickup
        </span>
      )}
    </div>
  );
}
