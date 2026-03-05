"use client";

import { useState } from "react";
import { Search, ArrowRight, Upload, RefreshCw, Truck } from "lucide-react";
import Link from "next/link";
import { ConditionType, TransportType } from "@/types/hubDashboard.types";
import ConfirmReceiptModal from "./ConfirmReceiptModal";
import UploadPhotosModal from "./UploadPhotosModal";
import UpdateStatusModal from "./UpdateStatusModal";
import MarkInTransitModal from "./MarkInTransitModal";
import { StatCard } from "../common/StatCard";
import { INCOMING, OUTGOING, PROCESSING_HUB, PROCESSING_STATUS, TASKS } from "@/constants/hubDashboard";
import RecentActivities from "../common/RecentActivities";
import TaskToDo from "../common/TaskToDo";



// ── Section Header ─────────────────────────────────────────────────────────────
function SectionHeader({ title }: { title: string }) {
    return (
        <div className="bg-sky-50 px-4 py-2.5 rounded-t-xl border-b border-sky-100">
            <p className="text-sm font-semibold text-gray-700">{title}</p>
        </div>
    );
}

// ── Modal state types ─────────────────────────────────────────────────────────
type ModalType =
    | { type: "confirm"; shipmentId: string }
    | { type: "upload"; shipmentId: string }
    | { type: "updateStatus"; shipmentId: string; currentStatus: string }
    | { type: "markTransit"; shipmentId: string }
    | null;

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function HubDashboardPage() {
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState<ModalType>(null);
    const closeModal = () => setModal(null);

    const handleConfirm = (condition: ConditionType, note: string) => {
        console.log("Confirmed receipt:", { condition, note });
        closeModal();
    };
    const handleUploadSave = (photos: { url: string; label: string }[]) => {
        console.log("Photos saved:", photos.length);
        closeModal();
    };
    const handleStatusUpdate = (newStatus: string, note: string) => {
        console.log("Status updated:", { newStatus, note });
        closeModal();
    };
    const handleDispatch = (data: {
        nextHub: string;
        dispatchDateTime: string;
        assignedStaff: string;
        transportType: TransportType;
    }) => {
        console.log("Dispatch confirmed:", data);
        closeModal();
    };

    return (
        <div className="min-h-screen bg-gray-50 font-inter">
            <div className="max-w-5xl mx-auto px-4 py-8">

                {/* ── Top Header ── */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                            Welcome back, Australia Hub (UEA)
                        </h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            Wednesday, February 18, 2026
                        </p>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-gray-300 overflow-hidden shrink-0 ring-2 ring-white shadow-md">
                        <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-sm font-bold">
                            A
                        </div>
                    </div>
                </div>

                {/* ── Stat Cards ── */}
                <div className="flex flex-wrap gap-3 mb-7">
                    <StatCard label="Arrived Today" count={24} color="text-sky-600 bg-sky-100" />
                    <StatCard label="In Hub" count={25} color="text-amber-600 bg-amber-100" />
                    <StatCard label="Dispatched Today" count={24} color="text-emerald-600 bg-emerald-100" />
                    <StatCard label="Pending Actions" count={32} color="text-violet-600 bg-violet-100" />
                </div>

                {/* ── All Shipment Header ── */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <h2 className="text-base font-bold text-gray-800">All Shipment</h2>
                    <div className="relative w-full sm:w-64">
                        <Search
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            placeholder="Search here..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white"
                        />
                    </div>
                </div>

                {/* ── Shipment Sections ── */}
                <div className="flex flex-col gap-4 mb-7">

                    {/* 1. Incoming */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <SectionHeader title="Incoming Shipments" />
                        {INCOMING.map((s) => (
                            <div
                                key={s.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors"
                            >
                                <Link
                                    href={`/shipments/${s.id}`}
                                    className="text-sm text-gray-800 hover:text-primary transition-colors"
                                >
                                    <span className="font-semibold text-primary underline underline-offset-2">
                                        {s.id}
                                    </span>{" "}
                                    (Origin: {s.origin}, {s.time}) – {s.status}
                                </Link>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => setModal({ type: "confirm", shipmentId: s.id })}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        Confirm Receipt
                                    </button>
                                    <button
                                        onClick={() => setModal({ type: "upload", shipmentId: s.id })}
                                        className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <Upload size={12} />
                                        Upload Photos
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 2. Processing (status) */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <SectionHeader title="Processing(In-Hub)" />
                        {PROCESSING_STATUS.map((s) => (
                            <div
                                key={s.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors"
                            >
                                <Link
                                    href={`/shipments/${s.id}`}
                                    className="text-sm text-gray-800"
                                >
                                    <span className="font-semibold text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">
                                        {s.id}
                                    </span>{" "}
                                    (Origin: {s.origin}, Status: {s.status})
                                </Link>
                                <button
                                    onClick={() => setModal({ type: "upload", shipmentId: s.id })}
                                    className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                                >
                                    <Upload size={12} />
                                    Upload Photos
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* 3. Processing (hub) */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <SectionHeader title="Processing(In-Hub)" />
                        {PROCESSING_HUB.map((s) => (
                            <div
                                key={s.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors"
                            >
                                <Link href={`/shipments/${s.id}`} className="text-sm text-gray-800">
                                    <span className="font-semibold text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">
                                        {s.id}
                                    </span>{" "}
                                    (Dest: {s.dest}, Status: {s.status})
                                    <br />
                                    <span className="text-gray-400 text-xs">{s.time}</span>
                                </Link>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() =>
                                            setModal({
                                                type: "updateStatus",
                                                shipmentId: s.id,
                                                currentStatus: "In Transit",
                                            })
                                        }
                                        className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <RefreshCw size={11} />
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 4. Outgoing */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                        <SectionHeader title="Outgoing/Ready to Dispatch" />
                        {OUTGOING.map((s) => (
                            <div
                                key={s.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors"
                            >
                                <Link href={`/shipments/${s.id}`} className="text-sm text-gray-800">
                                    <span className="font-semibold text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">
                                        {s.id}
                                    </span>{" "}
                                    (Next Hub: {s.nextHub}, Dispach: {s.dispatchTime})
                                </Link>
                                <button
                                    onClick={() =>
                                        setModal({ type: "markTransit", shipmentId: s.id })
                                    }
                                    className="flex items-center gap-1.5 text-xs font-semibold text-primary border border-primary/30 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors shrink-0"
                                >
                                    <Truck size={12} />
                                    Mark as in Transit
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Bottom Cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Task To Do */}
                    <TaskToDo/>

                    {/* Recent Activities */}
                    <RecentActivities/>
                </div>
            </div>

            {/* ── Modals ── */}
            {modal?.type === "confirm" && (
                <ConfirmReceiptModal
                    trackingId={modal.shipmentId}
                    origin="Shanghai"
                    destination="Australia Hub"
                    arrivalTime="February 18, 2026 02:00PM"
                    onClose={closeModal}
                    onConfirm={handleConfirm}
                />
            )}
            {modal?.type === "upload" && (
                <UploadPhotosModal
                    trackingId={modal.shipmentId}
                    onClose={closeModal}
                    onSave={handleUploadSave}
                />
            )}
            {modal?.type === "updateStatus" && (
                <UpdateStatusModal
                    trackingId={modal.shipmentId}
                    currentStatus={modal.currentStatus}
                    onClose={closeModal}
                    onUpdate={handleStatusUpdate}
                />
            )}
            {modal?.type === "markTransit" && (
                <MarkInTransitModal
                    trackingId={modal.shipmentId}
                    onClose={closeModal}
                    onConfirm={handleDispatch}
                />
            )}
        </div>
    );
}