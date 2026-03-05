import { ACTIVITIES } from '@/constants/hubDashboard'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function RecentActivities() {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-gray-800">Recent Activities</h3>
                <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    View all <ArrowRight size={13} />
                </button>
            </div>
            <div className="flex flex-col gap-3">
                {ACTIVITIES.map((act, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded bg-primary flex items-center justify-center shrink-0 mt-0.5">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <p className="text-sm text-gray-700">
                            <Link
                                href={`/shipments/${act.id}`}
                                className="font-semibold text-primary hover:underline"
                            >
                                {act.id}
                            </Link>{" "}
                            {act.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentActivities