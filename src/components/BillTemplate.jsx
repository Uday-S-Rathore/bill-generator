import React from 'react';

const BillTemplate = React.forwardRef(({ data }, ref) => {
  const units = (Number(data.currReading) || 0) - (Number(data.prevReading) || 0);
  const totalAmount = units * Number(data.rate);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="flex justify-center mt-4 mb-20">
      <div 
        ref={ref} 
        className="w-[350px] p-8"
        style={{ backgroundColor: '#ffffff', color: '#000000', fontFamily: 'sans-serif' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0', textTransform: 'uppercase' }}>Electricity Bill</h1>
        </div>

        {/* Info Rows */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <div style={{ width: '50%', fontWeight: 'bold' }}>Date:</div>
            <div style={{ width: '50%', textAlign: 'right' }}>{data.billDate}</div>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <div style={{ width: '50%', fontWeight: 'bold' }}>Tenant:</div>
            <div style={{ width: '50%', textAlign: 'right', textTransform: 'uppercase' }}>{data.tenantName || '_________'}</div>
          </div>
        </div>

        {/* Readings Box */}
        <div style={{ backgroundColor: '#f3f4f6', border: '1px solid #000', padding: '15px' }}>
          <div style={{ display: 'flex', marginBottom: '8px' }}>
            <div style={{ width: '60%' }}>Current Reading:</div>
            <div style={{ width: '40%', textAlign: 'right', fontWeight: 'bold' }}>{formatNumber(data.currReading)}</div>
          </div>
          <div style={{ display: 'flex', marginBottom: '8px' }}>
            <div style={{ width: '60%' }}>Previous Reading:</div>
            <div style={{ width: '40%', textAlign: 'right', fontWeight: 'bold' }}>{formatNumber(data.prevReading)}</div>
          </div>
          <div style={{ borderTop: '1px solid #999', margin: '10px 0' }}></div>
          <div style={{ display: 'flex', fontSize: '18px', fontWeight: 'bold' }}>
            <div style={{ width: '60%' }}>Total Units:</div>
            <div style={{ width: '40%', textAlign: 'right' }}>{formatNumber(units)}</div>
          </div>
        </div>

        {/* Grand Total */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Amount to Pay</div>
          <div style={{ fontSize: '36px', fontWeight: '900', margin: '5px 0' }}>
            ₹ {formatNumber(totalAmount)}
          </div>
          <div style={{ fontSize: '12px', color: '#999', marginTop: '10px' }}>Rate: ₹{data.rate}/unit</div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '40px', paddingTop: '15px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '12px', color: '#666' }}>
          Please pay before the due date.
        </div>
      </div>
    </div>
  );
});

BillTemplate.displayName = "BillTemplate";
export default BillTemplate;