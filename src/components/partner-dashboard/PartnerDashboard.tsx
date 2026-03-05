import React from 'react'
import { StatCard } from '../common/StatCard'
import TaskToDo from '../common/TaskToDo'
import RecentActivities from '../common/RecentActivities'
import NewShipmentQueue from './NewShipmentQueue'

function PartnerDashboard() {
    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>

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

            {/* new shipment queue */}
            <NewShipmentQueue />

            {/* ── Bottom Cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
                {/* Task To Do */}
                <TaskToDo />

                {/* Recent Activities */}
                <RecentActivities />
            </div>
        </div>
    )
}

export default PartnerDashboard