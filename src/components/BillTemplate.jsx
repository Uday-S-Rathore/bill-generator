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

  const currentYear = new Date().getFullYear();

  const fontStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  };

  return (
    <div className="flex justify-center mt-4 mb-20">
      <div 
        ref={ref} 
        style={{ 
          ...fontStyle,
          width: '450px', // FIX: Set to 450px so it is wide and spacious
          backgroundColor: '#ffffff', 
          padding: '0px', // FIX: No outer padding, so header touches the edges
          color: '#000000', 
          border: '2px solid #000',
          overflow: 'hidden' // Keeps everything neat inside the border
        }}
      >
        {/* 1. The Corporate Header (Full Width) */}
        <div style={{ 
          backgroundColor: '#172554', // Deep Navy Blue
          color: '#ffffff',
          padding: '25px', // Padding is now inside here
          textAlign: 'center',
          borderBottom: '2px solid #000'
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '26px', 
            fontWeight: '800', 
            textTransform: 'uppercase', 
            letterSpacing: '3px',
            marginBottom: '5px'
          }}>
            Electricity Bill
          </h2>
          <p style={{ margin: 0, fontSize: '11px', opacity: '0.8', letterSpacing: '2px', textTransform: 'uppercase' }}>
             Billing Period
          </p>
          <p style={{ 
            margin: '2px 0 0 0', 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#fbbf24' // Gold text
          }}>
             {data.billMonth} {currentYear}
          </p>
        </div>

        {/* 2. The Body Wrapper (Adds white space around the text) */}
        <div style={{ padding: '30px' }}> 
          
          {/* Basic Info */}
          <div style={{ marginBottom: '25px', fontSize: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#666', fontWeight: '600' }}>Bill Date:</span>
              <span style={{ fontWeight: '700' }}>{formatDate(data.billDate)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <span style={{ color: '#666', fontWeight: '600' }}>Tenant:</span>
              <span style={{ textTransform: 'capitalize', fontWeight: '700' }}>{data.tenantName || '_________'}</span>
            </div>
          </div>

          {/* Meter Readings Box */}
          <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '15px', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px' }}>
              <span>Current Reading:</span>
              <span style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px' }}>{formatNumber(data.currReading || 0)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
              <span>Previous Reading:</span>
              <span style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px' }}>{formatNumber(data.prevReading || 0)}</span>
            </div>
          </div>

          {/* Units Consumed Highlight Badge */}
          <div 
            style={{ 
              marginTop: '20px', 
              textAlign: 'center', 
              border: '2px dashed #3b82f6', 
              backgroundColor: '#eff6ff',
              borderRadius: '8px',
              paddingTop: '12px'
            }}
          >
              <span style={{ fontSize: '12px', color: '#1e40af', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Units Consumed
              </span>
              
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#1e40af', lineHeight: '1', marginTop: '5px' }}>
                  {units > 0 ? units : 0}
              </div>

              {/* The "Invisible Dot" Fix */}
              <div style={{ 
                color: '#eff6ff', 
                fontSize: '20px', 
                lineHeight: '20px',
                userSelect: 'none'
              }}>.</div>
          </div>

          {/* Total Amount */}
          <div style={{ marginTop: '35px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Amount to Pay</div>
            <div style={{ fontSize: '48px', fontWeight: '900', margin: '5px 0', letterSpacing: '-1px' }}>
              ₹{formatNumber(totalAmount > 0 ? totalAmount : 0)}
            </div>
            <div style={{ fontSize: '13px', color: '#999', marginTop: '5px' }}>Rate Applied: ₹{data.rate}/unit</div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '15px', textAlign: 'center', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>
            Please pay before the due date. Thank you!
          </div>

        </div> {/* End of Body Wrapper */}
      </div>
    </div>
  );
});

BillTemplate.displayName = "BillTemplate";
export default BillTemplate;