import React from 'react';

const BillTemplate = React.forwardRef(({ data }, ref) => {
  const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);

  const units1 = (Number(data.currReading) || 0) - (Number(data.prevReading) || 0);
  const units2 = (Number(data.currReading2) || 0) - (Number(data.prevReading2) || 0);

  let finalUnits = units1;
  let calculationLabel = "Total Units";

  if (data.mode === 'add') {
    finalUnits = units1 + units2;
    calculationLabel = "Total Combined Units";
  } else if (data.mode === 'subtract') {
    finalUnits = units1 - units2;
    calculationLabel = `Net Billable Units (${data.tenantName || 'Main'})`;
  }

  if (finalUnits < 0) finalUnits = 0;
  const totalAmount = finalUnits * Number(data.rate);

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
    // FIX 1: 'w-fit mx-auto' centers the bill safely. 
    // If the screen is too small, it aligns left so you can scroll.
    <div className="w-fit mx-auto mt-4 mb-20">
      <div 
        ref={ref} 
        style={{ 
          ...fontStyle,
          
          // FIX 2: Force 450px width and prevent shrinking
          width: '450px',
          minWidth: '450px', 
          flexShrink: 0,
          
          backgroundColor: '#ffffff', 
          padding: '0px', 
          color: '#000000', 
          border: '2px solid #000',
          overflow: 'hidden',
          WebkitTextSizeAdjust: '100%', 
          textSizeAdjust: '100%'
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: '#172554', color: '#ffffff', padding: '20px', textAlign: 'center', borderBottom: '2px solid #000' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '5px' }}>
            Electricity Bill
          </h2>
          <p style={{ margin: 0, fontSize: '11px', opacity: '0.8', letterSpacing: '2px', textTransform: 'uppercase' }}>Billing Period</p>
          <p style={{ margin: '2px 0 0 0', fontSize: '18px', fontWeight: 'bold', color: '#fbbf24' }}>{data.billMonth} {currentYear}</p>
        </div>

        {/* Body */}
        <div style={{ padding: '25px' }}> 
          
          {/* Info */}
          <div style={{ marginBottom: '25px', fontSize: '14px' }}>
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
          <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '15px', borderRadius: '6px' }}>
            
            {/* Standard Mode */}
            {data.mode === 'single' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', fontSize: '14px' }}>
                  <span style={{ marginRight: '5px' }}>Current Reading:</span>
                  <span style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px' }}>{formatNumber(data.currReading || 0)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                  <span style={{ marginRight: '5px' }}>Previous Reading:</span>
                  <span style={{ fontWeight: 'bold', fontFamily: 'monospace', fontSize: '16px' }}>{formatNumber(data.prevReading || 0)}</span>
                </div>
              </>
            )}

            {/* Advanced Modes */}
            {data.mode !== 'single' && (
              <div style={{ fontSize: '13px' }}>
                
                {/* Row 1 */}
                <div style={{ marginBottom: '12px', borderBottom: '1px dashed #ddd', paddingBottom: '8px' }}>
                    <div style={{ fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>
                        {data.tenantName || "Main Tenant"}:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: '5px', color: '#555', fontFamily: 'monospace', fontSize: '12px' }}>
                        <span>Current: {data.currReading || 0}</span>
                        <span>Previous: {data.prevReading || 0}</span>
                        <span style={{ fontWeight: 'bold', color: '#000' }}>= {units1} Units</span>
                    </div>
                </div>

                {/* Row 2 */}
                <div style={{ marginBottom: '8px' }}>
                    <div style={{ fontWeight: 'bold', color: data.mode === 'subtract' ? '#dc2626' : '#d97706', marginBottom: '4px' }}>
                         {data.mode === 'subtract' ? 'Less: ' : 'Add: '} 
                         {data.meter2Name || "Second Meter"}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: '5px', color: '#555', fontFamily: 'monospace', fontSize: '12px' }}>
                        <span>Current: {data.currReading2 || 0}</span>
                        <span>Previous: {data.prevReading2 || 0}</span>
                        <span style={{ fontWeight: 'bold', color: '#000' }}>= {units2} Units</span>
                    </div>
                </div>

                {/* Summary */}
                <div style={{ borderTop: '2px solid #ddd', marginTop: '10px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', color: '#1e40af' }}>
                  <span style={{ fontSize: '13px' }}>{calculationLabel}:</span>
                  <span style={{ fontSize: '14px' }}>{finalUnits} Units</span>
                </div>
              </div>
            )}
          </div>

          {/* Units Consumed */}
          <div style={{ marginTop: '20px', textAlign: 'center', border: '2px dashed #3b82f6', backgroundColor: '#eff6ff', borderRadius: '8px', paddingTop: '12px' }}>
              <span style={{ fontSize: '12px', color: '#1e40af', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>Units Consumed</span>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#1e40af', lineHeight: '1', marginTop: '5px' }}>{finalUnits > 0 ? finalUnits : 0}</div>
              <div style={{ color: '#eff6ff', fontSize: '20px', lineHeight: '20px', userSelect: 'none' }}>.</div>
          </div>

          {/* Amount */}
          <div style={{ marginTop: '35px', textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#666', fontWeight: '600', textTransform: 'uppercase' }}>Amount to Pay</div>
            <div style={{ fontSize: '48px', fontWeight: '900', margin: '5px 0', letterSpacing: '-1px' }}>₹{formatNumber(totalAmount > 0 ? totalAmount : 0)}</div>
            <div style={{ fontSize: '13px', color: '#999', marginTop: '5px' }}>Rate Applied: ₹{data.rate}/unit</div>
          </div>

          <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '15px', textAlign: 'center', fontSize: '12px', color: '#999', fontStyle: 'italic' }}>Please pay before the due date. Thank you!</div>

        </div> 
      </div>
    </div>
  );
});

BillTemplate.displayName = "BillTemplate";
export default BillTemplate;