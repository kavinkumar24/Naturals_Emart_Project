import React from 'react'
import { useState } from 'react'

function Load() {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    )
  return (
    <div>
      <div className={`border fixed shadow rounded-md p-4 max-w-full min-h-full inset-0 z-50 w-full md:w-[100%]  ml-0  mx-auto ${theme === 'dark' ? 'bg-gray-800 border-blue-300 ' : 'bg-white border-gray-200'} sm:ml-0`} >
    <div className="animate-pulse flex space-x-4 mt-16">
  <div className={`rounded-fullh-10 w-10`}></div>
  <div className="flex-1 space-y-6 py-10 md:py-1">
    <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
    <div className="space-y-5 md:space-y-3">
      <div className="grid grid-cols-3 gap-4">
        <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded col-span-2`}></div>
        <div className={`h-2 w-[70%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded col-span-1`}></div>
      </div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className="grid grid-cols-3 gap-4">
      <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2  ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      </div>
      
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className="grid grid-cols-3 gap-4">
      <div className={`h-2  ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      
      </div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className="grid grid-cols-3 gap-4">
      <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2  ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      </div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2 w-[90%] ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className="grid grid-cols-3 gap-4">
      <div className={`h-2 ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      <div className={`h-2  ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200'} rounded`}></div>
      </div>
    </div>
    
  </div>
</div>
</div>
    </div>
  )
}

export default Load
