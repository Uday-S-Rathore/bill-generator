import React from 'react';

const BillTemplate = React.forwardRef(({ data }, ref) => {
  const units = (Number(data.currReading) || 0) - (Number(data.prevReading) || 0);
  const totalAmount = units * Number(data.rate);
  const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);

  // Helper to change 2026-01-09 -> 09/01/2026
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex justify-center mt-4 mb-20">
      <div 
        ref={ref} 
        style={{ 
          width: '350px', 
          backgroundColor: '#ffffff', 
          padding: '30px', 
          color: '#000000', 
          fontFamily: 'Arial, sans-serif',
          border: '2px solid #000'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '22px', textTransform: 'uppercase', letterSpacing: '1px' }}>Electricity Bill</h2>
          {/* New Month Field */}
          <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555' }}>
             For: <span style={{ fontWeight: 'bold', color: '#000' }}>{data.billMonth}</span>
          </p>
        </div>

        {/* Basic Info */}
        <div style={{ marginBottom: '20px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>Bill Date:</span>
            {/* Using the new formatter here */}
            <span>{formatDate(data.billDate)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
            <span style={{ fontWeight: 'bold' }}>Tenant:</span>
            {/* Changed to 'capitalize' so it is not all caps */}
            <span style={{ textTransform: 'capitalize' }}>{data.tenantName || '_________'}</span>
          </div>
        </div>

        {/* Calculations Box */}
        <div style={{ backgroundColor: '#f9fafb', border: '1px solid #000', padding: '15px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Current Reading:</span>
            <span style={{ fontWeight: 'bold' }}>{formatNumber(data.currReading || 0)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span>Previous Reading:</span>
            <span style={{ fontWeight: 'bold' }}>{formatNumber(data.prevReading || 0)}</span>
          </div>
          <div style={{ borderTop: '1px solid #ccc', margin: '10px 0' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
            <span>Total Units:</span>
            <span>{formatNumber(units > 0 ? units : 0)}</span>
          </div>
        </div>

        {/* Total Amount */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <div style={{ fontSize: '14px', color: '#666' }}>Amount to Pay</div>
          <div style={{ fontSize: '36px', fontWeight: 'bold', margin: '5px 0' }}>
            ₹{formatNumber(totalAmount > 0 ? totalAmount : 0)}
          </div>
          <div style={{ fontSize: '12px', color: '#999' }}>Rate: ₹{data.rate}/unit</div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '15px', textAlign: 'center', fontSize: '12px', color: '#888' }}>
          Please pay before the due date.
        </div>
      </div>
    </div>
  );
});

BillTemplate.displayName = "BillTemplate";
export default BillTemplate;