import { useState, useRef } from 'react';
import BillForm from './components/BillForm';
import BillTemplate from './components/BillTemplate';
import html2canvas from 'html2canvas';

function App() {
  // 1. The State lives here now!
  const [data, setData] = useState({
    tenantName: '',
    prevReading: '',
    currReading: '',
    rate: 8,
    billDate: new Date().toISOString().split('T')[0]
  });

  // 2. The Ref acts as a camera lens pointing at the receipt
  const receiptRef = useRef(null);

  // 3. Helper to update state
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 4. The Download Function
  // src/App.jsx

const handleDownload = async () => {
  if (receiptRef.current) {
    const canvas = await html2canvas(receiptRef.current, {
      scale: 3,             // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: -window.scrollY, // Fixes issues if you are scrolled down
      onclone: (clonedDoc) => {
        // This ensures the element is visible during the "photo"
        clonedDoc.style.display = 'block';
      }
    });
    
    const link = document.createElement('a');
    link.download = `Bill-${data.tenantName || 'Tenant'}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row gap-8 p-4 md:p-10">
      
      {/* Left Side: The Input Form */}
      <div className="w-full md:w-1/2">
        <div className="sticky top-10">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">⚡ Bill Generator</h1>
            
            <BillForm data={data} handleChange={handleChange} />
            
            {/* Download Button */}
            <button 
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-bold shadow-lg transition-all transform active:scale-95 mt-4"
            >
                📥 Download Receipt
            </button>
        </div>
      </div>

      {/* Right Side: The Live Receipt Preview */}
      <div className="w-full md:w-1/2 flex justify-center items-start bg-gray-200 p-4 rounded-xl border border-gray-300 overflow-auto">
         <div className="scale-90 md:scale-100 origin-top">
            {/* We pass the 'ref' here so the camera knows where to look */}
            <BillTemplate data={data} ref={receiptRef} />
         </div>
      </div>

    </div>
  );
}

export default App;