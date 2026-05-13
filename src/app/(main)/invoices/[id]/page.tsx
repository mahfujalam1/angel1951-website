"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Package,
  Calendar,
  CreditCard,
  Download,
  CheckCircle2,
  X,
  Gift,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

const InvoiceDetailsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const router = useRouter();
  const { id } = use(params);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [tempSelectedReward, setTempSelectedReward] = useState<string | null>(
    null,
  );
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [paidInstalments, setPaidInstalments] = useState<number>(0);
  const globalInstalments = 3; // This would typically come from an API/config

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);

  const rewards = [
    {
      id: "air",
      type: "Air Cargo",
      label: "10% Discount",
      progress: 60,
      current: 3,
      total: 5,
      discount: 25.0,
    },
    {
      id: "sea",
      type: "Sea Cargo",
      label: "Free Shipment",
      progress: 40,
      current: 2,
      total: 5,
      discount: 50.0,
    },
    {
      id: "kg",
      type: "KG Shipment",
      label: "Bonus Reward",
      progress: 70,
      current: 7,
      total: 10,
      discount: 15.0,
    },
  ];

  // Mock data for the specific invoice
  const invoice = {
    id: id,
    invoiceNo: id,
    date: "May 10, 2026",
    status: isPaid ? "PAID" : "PENDING",
    subtotal: 575.5,
    discount: 50.0,
    shipments: [
      {
        orderNo: "#LG-1001",
        route: "Berlin (BER) → Tokyo (NRT)",
        status: "Delivered",
        statusColor: "bg-green-50 text-green-600",
        date: "Oct 24, 2023",
        amount: 475.5,
      },
      {
        orderNo: "#LG-1002",
        route: "Berlin (BER) → Tokyo (NRT)",
        status: "Delivered",
        statusColor: "bg-green-50 text-green-600",
        date: "Oct 24, 2023",
        amount: 575.5,
      },
      {
        orderNo: "#LG-1003",
        route: "Berlin (BER) → Tokyo (NRT)",
        status: "Delivered",
        statusColor: "bg-green-50 text-green-600",
        date: "Oct 24, 2023",
        amount: 675.5,
      },
    ],
  };

  const handleFinalPayment = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (isInstalmentMode) {
      const next = paidInstalments + 1;
      setPaidInstalments(next);
      if (next === globalInstalments) {
        setIsPaid(true);
      }
      toast.success(`Instalment ${next} paid successfully!`);
    } else {
      setIsPaid(true);
      toast.success("Payment successful! Invoice status updated.");
    }

    setIsProcessing(false);
    setShowRewardModal(false);
  };

  const currentRewardDiscount = selectedReward
    ? rewards.find((r) => r.id === selectedReward)?.discount || 0
    : 0;
  const totalPayable =
    invoice.subtotal - invoice.discount - currentRewardDiscount;

  const isInstalmentMode =
    userRole === "businessCustomer" ||
    userRole === "containerCustomer" ||
    userRole === "corporatePartner" ||
    userRole === "corporateCustomer";
  const perInstalment = isInstalmentMode
    ? Math.ceil(totalPayable / globalInstalments)
    : totalPayable;

  const instalmentData = isInstalmentMode
    ? Array.from({ length: globalInstalments }, (_, i) => {
        const amount =
          i === globalInstalments - 1
            ? totalPayable - perInstalment * (globalInstalments - 1)
            : perInstalment;
        return {
          id: i + 1,
          amount,
          status: i < paidInstalments ? "PAID" : "PENDING",
          dueDate: `Month ${i + 1}`,
        };
      })
    : [];

  const handleApplyReward = () => {
    setSelectedReward(tempSelectedReward);
    if (tempSelectedReward) {
      toast.success("Reward applied to your total!");
    } else {
      toast.success("Reward selection cleared.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-fadeIn min-h-screen">
      <Link
        href="/invoices"
        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#18319b] transition-colors group mb-4"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />{" "}
        Back to Invoices
      </Link>

      {/* Invoice Header Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-blue-50/50 border border-gray-100 overflow-hidden">
        <div className="p-8 md:p-12 bg-gray-50/50 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-900 rounded-2xl text-white">
                <Package size={28} />
              </div>
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1 block">
                  Shipment Invoice
                </span>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                  {invoice.invoiceNo}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                <Calendar size={16} className="text-gray-400" /> Issued on{" "}
                {invoice.date}
              </div>
              <div
                className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  invoice.status === "PAID"
                    ? "bg-green-500 text-white shadow-lg shadow-green-100"
                    : "bg-orange-500 text-white shadow-lg shadow-orange-100"
                }`}
              >
                {invoice.status}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100">
                <th className="py-6 px-12 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Shipment ID
                </th>
                <th className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Route Details
                </th>
                <th className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-center">
                  Status
                </th>
                <th className="py-6 px-8 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  Amount
                </th>
                <th className="py-6 px-12 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoice.shipments.map((ship, i) => (
                <tr
                  key={i}
                  className="hover:bg-blue-50/20 transition-colors group"
                >
                  <td className="py-8 px-12">
                    <span className="text-sm font-bold text-gray-900">
                      {ship.orderNo}
                    </span>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">
                      {ship.date}
                    </p>
                  </td>
                  <td className="py-8 px-8">
                    <div className="text-sm text-gray-600 font-medium max-w-[250px] leading-relaxed">
                      {ship.route}
                    </div>
                  </td>
                  <td className="py-8 px-8 text-center">
                    <span
                      className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tight ${ship.statusColor} border border-current opacity-80`}
                    >
                      {ship.status}
                    </span>
                  </td>
                  <td className="py-8 px-8">
                    <span className="text-sm font-black text-gray-900">
                      ${ship.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-8 px-12 text-right">
                    <Link
                      href={`/shipments/${ship.orderNo.replace("#", "")}`}
                      className="inline-flex items-center gap-2 text-[11px] font-black text-blue-600 uppercase tracking-widest hover:underline group"
                    >
                      View Details{" "}
                      <ArrowUpRight
                        size={16}
                        className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Instalment Breakdown Section (For Business/Container) */}
        {isInstalmentMode && (
          <div className="p-8 md:p-12 border-t border-gray-100 bg-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-50 text-[#18319b] rounded-lg">
                <Layers size={20} />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                  Instalment Plan
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  Your payment is divided into {globalInstalments} equal parts
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {instalmentData.map((inst) => (
                <div
                  key={inst.id}
                  className={`p-6 rounded-3xl border-2 transition-all ${
                    inst.status === "PAID"
                      ? "bg-green-50/50 border-green-100 shadow-sm"
                      : inst.id === paidInstalments + 1
                        ? "bg-blue-50/30 border-blue-200 shadow-md ring-1 ring-blue-100"
                        : "bg-gray-50/30 border-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${
                        inst.status === "PAID"
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      Instalment 0{inst.id}
                    </span>
                    {inst.status === "PAID" && (
                      <div className="p-1 bg-green-500 rounded-full text-white">
                        <CheckCircle2 size={12} />
                      </div>
                    )}
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 mb-1">
                    ${inst.amount.toFixed(2)}
                  </h4>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                      {inst.dueDate}
                    </span>
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                        inst.status === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {inst.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Redeem Reward Table Row */}
        {userRole !== "corporatePartner" &&
          userRole !== "corporateCustomer" && (
            <div className="p-8 md:p-12 border-t border-gray-100 bg-white space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#18319b]">
                  <Gift size={20} />
                  <h3 className="text-sm font-black uppercase tracking-widest">
                    Redeem Reward
                  </h3>
                </div>
                {!isPaid && (
                  <button
                    onClick={handleApplyReward}
                    disabled={tempSelectedReward === selectedReward}
                    className="px-8 py-2.5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 disabled:shadow-none"
                  >
                    Apply Reward
                  </button>
                )}
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-20">
                        S/N
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Reward Type
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Benefit
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        Progress
                      </th>
                      <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {rewards.map((reward, index) => (
                      <tr
                        key={reward.id}
                        className={`group transition-colors ${tempSelectedReward === reward.id ? "bg-blue-50/30" : "hover:bg-gray-50/50"}`}
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <label className="relative flex items-center cursor-pointer">
                              <input
                                type="radio"
                                name="reward"
                                disabled={isPaid}
                                checked={tempSelectedReward === reward.id}
                                onChange={() =>
                                  setTempSelectedReward(reward.id)
                                }
                                className="sr-only peer"
                              />
                              <div className="w-5 h-5 border-2 border-gray-200 rounded-full peer-checked:border-blue-600 peer-checked:bg-blue-600 transition-all after:content-[''] after:absolute after:top-[6px] after:left-[6px] after:w-2 after:h-2 after:bg-white after:rounded-full after:opacity-0 peer-checked:after:opacity-100"></div>
                            </label>
                            <span className="text-xs font-bold text-gray-400">
                              0{index + 1}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-sm font-black text-gray-900 uppercase tracking-tight">
                            {reward.type}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg uppercase tracking-widest">
                            {reward.label}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4 min-w-[150px]">
                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 transition-all duration-1000"
                                style={{ width: `${reward.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-black text-gray-400 whitespace-nowrap">
                              {reward.current}/{reward.total}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span
                            className={`text-[10px] font-black uppercase tracking-widest ${reward.progress >= 100 ? "text-green-500" : "text-orange-500"}`}
                          >
                            {reward.progress >= 100
                              ? "Unlocked"
                              : "In Progress"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        {/* Footer Calculation Section */}
        <div className="p-12 bg-gray-50/50 border-t border-gray-100 flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-md space-y-4">
            <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="p-3 bg-blue-50 text-[#18319b] rounded-xl">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  Secure Billing Note
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mt-1">
                  This invoice covers the specific costs associated with your
                  individual shipment. Any applicable corporate discounts have
                  been automatically deducted.
                </p>
              </div>
            </div>
          </div>

          <div className="min-w-[320px] space-y-4 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-blue-50">
            <div className="flex justify-between text-sm font-medium text-gray-500">
              <span>Shipment Total</span>
              <span className="text-gray-900">
                ${invoice.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-medium text-green-600">
              <span>Discount</span>
              <span>-${invoice.discount.toFixed(2)}</span>
            </div>
            {selectedReward && (
              <div className="flex justify-between text-sm font-medium text-blue-600 font-bold italic">
                <span>
                  {rewards.find((r) => r.id === selectedReward)?.label}
                </span>
                <span>-${currentRewardDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
              <span className="text-sm font-black text-gray-900 uppercase tracking-widest">
                {isInstalmentMode
                  ? `Next Instalment (#0${paidInstalments + 1})`
                  : "Total Payable"}
              </span>
              <h3 className="text-3xl font-black text-blue-900">
                ${(isInstalmentMode ? perInstalment : totalPayable).toFixed(2)}
              </h3>
            </div>

            {isInstalmentMode && !isPaid && (
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-right">
                Total Remaining: $
                {(totalPayable - paidInstalments * perInstalment).toFixed(2)}
              </p>
            )}

            {!isPaid ? (
              <button
                onClick={() => setShowRewardModal(true)}
                className="w-full mt-6 py-4 bg-[#18319b] text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-[#1230B3] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2"
              >
                Pay Now <CreditCard size={18} />
              </button>
            ) : (
              <div className="w-full mt-6 py-4 bg-green-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-100">
                <CheckCircle2 size={18} /> Invoice Paid
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reward & Payment Modal */}
      {showRewardModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
            <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                Confirm Payment
              </h3>
              <button
                onClick={() => setShowRewardModal(false)}
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500 font-medium">
                    Invoice Amount
                  </span>
                  <span className="text-gray-900 font-bold">
                    ${(invoice.subtotal - invoice.discount).toFixed(2)}
                  </span>
                </div>
                {selectedReward && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-600 font-medium">
                      Reward Discount
                    </span>
                    <span className="text-blue-600 font-bold">
                      -${currentRewardDiscount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <span className="text-sm font-black text-gray-900 uppercase">
                    {isInstalmentMode
                      ? `Pay Instalment 0${paidInstalments + 1}`
                      : "Final Total"}
                  </span>
                  <span className="text-2xl font-black text-[#18319b]">
                    $
                    {(isInstalmentMode ? perInstalment : totalPayable).toFixed(
                      2,
                    )}
                  </span>
                </div>

                <button
                  onClick={handleFinalPayment}
                  disabled={isProcessing}
                  className="w-full py-4 bg-gray-900 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"
                >
                  {isProcessing
                    ? "Processing..."
                    : `Confirm Payment ($${totalPayable.toFixed(2)})`}
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <Zap size={12} className="text-blue-500" /> Instant Settlement
                  via Stripe
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceDetailsPage;
