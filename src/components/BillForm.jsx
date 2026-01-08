const BillForm = ({ data, handleChange }) => {
  const units = (Number(data.currReading) || 0) - (Number(data.prevReading) || 0);
  const totalAmount = units * Number(data.rate);

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl">
      <div className="space-y-4">
        
        {/* Row 1: Tenant & Month */}
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Name</label>
            <input 
                type="text" 
                name="tenantName" 
                value={data.tenantName} 
                onChange={handleChange} 
                placeholder="e.g. Rahul"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Billing Month</label>
            <input 
                type="text" 
                name="billMonth" 
                value={data.billMonth} 
                onChange={handleChange} 
                placeholder="e.g. Jan 2026"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            />
            </div>
        </div>

        {/* Row 2: Date & Rate */}
        <div className="grid grid-cols-2 gap-4">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bill Date</label>
            <input type="date" name="billDate" value={data.billDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rate per Unit (₹)</label>
            <input type="number" name="rate" value={data.rate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
        </div>

        {/* Row 3: Readings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prev Reading</label>
            <input type="number" name="prevReading" value={data.prevReading} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Curr Reading</label>
            <input type="number" name="currReading" value={data.currReading} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg font-mono" />
          </div>
        </div>

        {/* Totals */}
        <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100 mt-2">
          <p className="text-sm text-blue-600 font-medium">Units: {units > 0 ? units : 0}</p>
          <p className="text-3xl font-bold text-blue-800">₹ {totalAmount > 0 ? totalAmount : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default BillForm;