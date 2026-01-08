import React from 'react';

const BillTemplate = React.forwardRef(({ data }, ref) => {
  
  // 1. Calculate values
  const units = (Number(data.currReading) || 0) - (Number(data.prevReading) || 0);
  const totalAmount = units * Number(data.rate);

  // 2. Helper for Indian Number Formatting (e.g., 1,200)
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="flex justify-center mt-8 mb-20">
      {/* The Receipt Image */}
      <div 
        ref={ref} 
        className="w-[350px] bg-white p-6 border-2 border-gray-800 shadow-2xl text-gray-900 font-sans"
        style={{ minHeight: '500px' }}
      >
        
        {/* Header (Removed "Official Receipt") */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider">Electricity Bill</h1>
        </div>

        {/* Details Table */}
        <div className="space-y-3 text-sm">
            <div className="flex justify-between">
                <span className="font-semibold">Date:</span>
                <span>{data.billDate}</span>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-2">
                <span className="font-semibold">Tenant:</span>
                <span className="uppercase">{data.tenantName || '_________'}</span>
            </div>
        </div>

        {/* Meter Readings Box (Fixed for Mobile Download Overlap) */}
<div className="mt-6 border border-gray-800 p-3 bg-gray-50">
    <div className="flex justify-between mb-2 items-center">
        {/* Added tracking-wide and a specific width to prevent overlapping */}
        <span className="font-semibold tracking-wide min-w-[120px]">Current Reading:</span>
        <span className="font-mono font-bold text-right">{formatNumber(data.currReading)}</span>
    </div>
    <div className="flex justify-between mb-2 items-center">
        <span className="font-semibold tracking-wide min-w-[120px]">Previous Reading:</span>
        <span className="font-mono font-bold text-right">{formatNumber(data.prevReading)}</span>
    </div>
    <div className="border-t border-gray-400 my-2"></div>
    <div className="flex justify-between text-lg font-bold items-center">
        <span className="tracking-wide">Total Units:</span>
        <span>{formatNumber(units)}</span>
    </div>
</div>

        {/* Grand Total (With Indian Commas) */}
        <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">Amount to Pay</p>
            <div className="text-4xl font-extrabold text-black mt-1">
                ₹ {formatNumber(totalAmount)}
            </div>
            <p className="text-xs text-gray-400 mt-2">Rate Applied: ₹{data.rate}/unit</p>
        </div>

        {/* Footer (Removed "Generated Digitally") */}
        <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-200 pt-4">
            <p>Please pay before the due date.</p>
        </div>

      </div>
    </div>
  );
});

BillTemplate.displayName = "BillTemplate";
export default BillTemplate;