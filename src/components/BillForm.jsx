const BillForm = ({ data, handleChange }) => {
  const units = (Number(data.currReading) || 0) - (Number(data.prevReading) || 0);
  const totalAmount = units * Number(data.rate);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="bg-white p-6 shadow-lg rounded-xl">
      <div className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Name</label>
              <input 
                type="text" name="tenantName" value={data.tenantName} onChange={handleChange} 
                placeholder="Enter Name"
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Billing Month</label>
              <select 
                name="billMonth" value={data.billMonth} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {months.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bill Date</label>
              <input type="date" name="billDate" value={data.billDate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rate (₹)</label>
              <input type="number" name="rate" value={data.rate} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg" />
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Previous Reading</label>
            <input 
              type="number" name="prevReading" value={data.prevReading} onChange={handleChange} 
              placeholder="e.g. 10450"
              className="w-full p-3 border border-gray-300 rounded-lg font-mono" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Reading</label>
            <input 
              type="number" name="currReading" value={data.currReading} onChange={handleChange} 
              placeholder="e.g. 10600"
              className="w-full p-3 border border-gray-300 rounded-lg font-mono" 
            />
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100 mt-2">
          <p className="text-sm text-blue-600 font-medium">Units: {units > 0 ? units : 0}</p>
          <p className="text-3xl font-bold text-blue-800">₹ {totalAmount > 0 ? totalAmount : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default BillForm;