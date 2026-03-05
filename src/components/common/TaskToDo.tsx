import { TASKS } from '@/constants/hubDashboard'
import { ArrowRight } from 'lucide-react'
import React from 'react'

function TaskToDo() {
  return (
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-800">Task To Do</h3>
              <button className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                  View all <ArrowRight size={13} />
              </button>
          </div>
          <div className="flex flex-col gap-3">
              {TASKS.map((task, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <span className="w-5 h-5 rounded bg-primary flex items-center justify-center shrink-0">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                      </span>
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          {task.label}
                      </span>
                  </label>
              ))}
          </div>
      </div>
  )
}

export default TaskToDo