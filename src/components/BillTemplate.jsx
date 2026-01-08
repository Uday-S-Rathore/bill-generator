import React from 'react';

const BillTemplate = React.forwardRef(({ data }, ref) => {
  
  const units = (Number(data.currReading) || 0) - (Number(data.prevReading) || 0);
  const totalAmount = units * Number(data.rate);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="flex justify-center mt-8 mb-20">
      <div 
        ref={ref} 
        className="w-[350px] bg-white p-6 border-2 border-gray-800 shadow-2xl text-gray-900 font-sans"
        style={{ minHeight: '500px' }}
      >
        
        {/* Header */}
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-4">
          <h1 className="text-2xl font-bold uppercase tracking-wider">Electricity Bill</h1>
        </div>

        {/* Details Table - Using Grid for 'Lane' separation */}
        <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2">
                <span className="font-semibold">Date:</span>
                <span className="text-right">{data.billDate}</span>
            </div>
            <div className="grid grid-cols-2 border-b border-gray-300 pb-2">
                <span className="font-semibold">Tenant:</span>
                <span className="text-right uppercase truncate">{data.tenantName || '_________'}</span>
            </div>
        </div>

        {/* Meter Readings Box - Forcing spacing with Grid */}
        <div className="mt-6 border border-gray-800 p-3 bg-gray-50">
            <div className="grid grid-cols-2 mb-2">
                <span className="font-semibold">Current Reading:</span>
                <span className="font-mono font-bold text-right">{formatNumber(data.currReading)}</span>
            </div>
            <div className="grid grid-cols-2 mb-2">
                <span className="font-semibold">Previous Reading:</span>
                <span className="font-mono font-bold text-right">{formatNumber(data.prevReading)}</span>
            </div>
            <div className="border-t border-gray-400 my-2"></div>
            <div className="grid grid-cols-2 text-lg font-bold">
                <span>Total Units:</span>
                <span className="text-right">{formatNumber(units)}</span>
            </div>
        </div>

        {/* Grand Total - Using padding to prevent 'Amount' and 'to Pay' collision */}
        <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-1">Amount to Pay</p>
            <div className="text-4xl font-extrabold text-black">
                ₹ {formatNumber(totalAmount)}
            </div>
            <p className="text-xs text-gray-400 mt-4">Rate Applied: ₹{data.rate}/unit</p>
        </div>

        {/* Footer - Extra margin to prevent collisions */}
        <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-200 pt-4">
            <p className="px-2">Please pay before the due date.</p>
        </div>

      </div>
    </div>
  );
});

BillTemplate.displayName = "BillTemplate";
export default BillTemplate;