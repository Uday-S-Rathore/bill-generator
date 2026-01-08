// components/BillForm.jsx
const BillForm = ({ data, handleChange }) => {
  // We removed the 'useState' from here. It now comes from props!

  // Simple calculation for display only
  const units = (Number(data.currReading) || 0) - (Number(data.prevReading) || 0);
  const totalAmount = units * Number(data.rate);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl mt-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Enter Bill Details
      </h2>

      <div className="space-y-4">
        {/* Tenant Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tenant Name</label>
          <input
            type="text"
            name="tenantName"
            value={data.tenantName}
            onChange={handleChange}
            placeholder="e.g. Rahul Kumar"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bill Date</label>
          <input
            type="date"
            name="billDate"
            value={data.billDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Previous Reading */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prev Reading</label>
            <input
              type="number"
              name="prevReading"
              value={data.prevReading}
              onChange={handleChange}
              placeholder="0"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg font-mono outline-none"
            />
          </div>

          {/* Current Reading */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Curr Reading</label>
            <input
              type="number"
              name="currReading"
              value={data.currReading}
              onChange={handleChange}
              placeholder="0"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg font-mono outline-none"
            />
          </div>
        </div>

        {/* Rate Per Unit */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rate per Unit (₹)</label>
            <input
              type="number"
              name="rate"
              value={data.rate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
        </div>

        {/* Live Preview */}
        <div className="bg-blue-50 p-4 rounded-lg mt-6 text-center border border-blue-100">
            <p className="text-sm text-blue-600 font-medium">Units Consumed: <span className="font-bold">{units > 0 ? units : 0}</span></p>
            <p className="text-3xl font-bold text-blue-800 mt-1">₹ {totalAmount > 0 ? totalAmount : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default BillForm;