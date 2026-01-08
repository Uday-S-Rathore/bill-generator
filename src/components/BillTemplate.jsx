import React from 'react';

const BillTemplate = React.forwardRef(({ data }, ref) => {
  const units = (Number(data.currReading) || 0) - (Number(data.prevReading) || 0);
  const totalAmount = units * Number(data.rate);
  const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // The Modern Font Stack for a clean, professional look
  const fontStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  return (
    <div className="flex justify-center mt-4 mb-20">
      <div 
        ref={ref} 
        style={{ 
          ...fontStyle,
          width: '350px', 
          backgroundColor: '#ffffff', 
          padding: '30px', 
          color: '#000000', 
          border: '2px solid #000'
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Electricity Bill
          </h2>
          <p style={{ margin: '5px 0 0 0', fontSize: '16px', color: '#333' }}>
             For: <span style={{ fontWeight: 'bold', color: '#000' }}>{data.billMonth} 2026</span>
          </p>
        </div>

        {/* Basic Info */}
        <div style={{ marginBottom: '20px', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#666', fontWeight: '600' }}>Bill Date:</span>
            <span style={{ fontWeight: '700' }}>{formatDate(data.billDate)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <span style={{ color: '#666', fontWeight: '600' }}>Tenant:</span>
            <span style={{ textTransform: 'capitalize', fontWeight: '700' }}>{data.tenantName || '_________'}</span>
          </div>
        </div>

        {/* Meter Readings Box */}
        <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
            <span>Current Reading:</span>
            <span style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '15px' }}>{formatNumber(data.currReading || 0)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
            <span>Previous Reading:</span>
            <span style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '15px' }}>{formatNumber(data.prevReading || 0)}</span>
          </div>
        </div>

        
{/* Units Consumed Highlight Badge - "Table-Cell" Centering Fix */}
<div 
  style={{ 
    marginTop: '15px', 
    border: '2px dashed #3b82f6', 
    backgroundColor: '#eff6ff',
    borderRadius: '8px',
    width: '100%',
    height: '90px', // Slightly taller for more breathing room
    display: 'table', // Forces a table structure
    borderCollapse: 'separate'
  }}
>
    <div style={{ 
      display: 'table-cell', 
      verticalAlign: 'middle', 
      textAlign: 'center' 
    }}>
        <div style={{ 
          fontSize: '11px', 
          color: '#1e40af', 
          fontWeight: '800', 
          textTransform: 'uppercase', 
          letterSpacing: '1px',
          marginBottom: '2px'
        }}>
            Units Consumed
        </div>
        <div style={{ 
          fontSize: '34px', 
          fontWeight: '900', 
          color: '#1e40af', 
          lineHeight: '34px', // Matches font size exactly to prevent extra spacing
          margin: '0',
          display: 'block'
        }}>
            {units > 0 ? units : 0}
        </div>
    </div>
</div>

        {/* Total Amount Section */}
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <div style={{ fontSize: '13px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Amount to Pay</div>
          <div style={{ fontSize: '42px', fontWeight: '900', margin: '5px 0', letterSpacing: '-1px' }}>
            ₹{formatNumber(totalAmount > 0 ? totalAmount : 0)}
          </div>
          <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>Rate Applied: ₹{data.rate}/unit</div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '15px', textAlign: 'center', fontSize: '11px', color: '#999', fontStyle: 'italic' }}>
          Please pay before the due date. Thank you!
        </div>
      </div>
    </div>
  );
});

BillTemplate.displayName = "BillTemplate";
export default BillTemplate;