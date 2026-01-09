import React from 'react';

const BillForm = ({ data, handleChange }) => {
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Bill Details</h2>
      
      <div className="grid gap-4">
        
        {/* Calculation Mode Dropdown */}
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <label className="block text-sm font-bold text-blue-800 mb-1">Calculation Mode</label>
            <select 
                name="mode" 
                value={data.mode} 
                onChange={handleChange}
                className="w-full p-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 bg-white"
            >
                <option value="single">Single Meter (Standard)</option>
                <option value="add">Two Meters (Add Together)</option>
                <option value="subtract">Sub-Meter (Deduct from Main)</option>
            </select>
        </div>

        {/* Primary Tenant Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
             {data.mode === 'subtract' ? 'Primary Tenant (Main Meter Holder)' : 'Tenant Name'}
          </label>
          <input 
            type="text" 
            name="tenantName" 
            placeholder="e.g. Rahul Kumar"
            value={data.tenantName} 
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>

        {/* Dates Row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Month</label>
            <select 
              name="billMonth" 
              value={data.billMonth} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white"
            >
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bill Date</label>
            <input 
              type="date" 
              name="billDate" 
              value={data.billDate} 
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* SECTION 1: Primary Readings */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                Reading for: {data.tenantName || "Main Tenant"}
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Previous</label>
                    <input type="number" name="prevReading" placeholder="0" value={data.prevReading} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg font-mono"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current</label>
                    <input type="number" name="currReading" placeholder="0" value={data.currReading} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg font-mono"/>
                </div>
            </div>
        </div>

        {/* SECTION 2: Conditional Second Meter */}
        {data.mode !== 'single' && (
             <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 animate-fade-in-down">
                
                {/* NEW: Input for the Name of the 2nd person/meter */}
                <div className="mb-3">
                    <label className="block text-sm font-bold text-orange-800 mb-1">
                        {data.mode === 'subtract' ? 'Name of Sub-Tenant (To Deduct)' : 'Name for Second Meter'}
                    </label>
                    <input 
                        type="text" 
                        name="meter2Name" 
                        placeholder={data.mode === 'subtract' ? "e.g. Amit (Sub-Meter)" : "e.g. Shop Meter"}
                        value={data.meter2Name} 
                        onChange={handleChange}
                        className="w-full p-2 border border-orange-300 rounded bg-white"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Previous</label>
                        <input type="number" name="prevReading2" placeholder="0" value={data.prevReading2} onChange={handleChange} className="w-full p-3 border border-orange-300 rounded-lg font-mono"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current</label>
                        <input type="number" name="currReading2" placeholder="0" value={data.currReading2} onChange={handleChange} className="w-full p-3 border border-orange-300 rounded-lg font-mono"/>
                    </div>
                </div>
            </div>
        )}

        {/* Rate Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rate per Unit (₹)</label>
          <input type="number" name="rate" value={data.rate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg"/>
        </div>

      </div>
    </div>
  );
};

export default BillForm;