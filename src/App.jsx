import { useState, useRef } from 'react';
import BillForm from './components/BillForm';
import BillTemplate from './components/BillTemplate';
import html2canvas from 'html2canvas';

function App() {
  const [data, setData] = useState({
    tenantName: '',
    prevReading: '',
    currReading: '',
    rate: 8,
    billDate: new Date().toISOString().split('T')[0]
  });

  const receiptRef = useRef(null);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDownload = async () => {
    if (receiptRef.current) {
      try {
        const canvas = await html2canvas(receiptRef.current, {
          scale: 2,
          backgroundColor: "#ffffff",
          useCORS: true,
          logging: false,
        });
        
        const link = document.createElement('a');
        link.download = `Bill-${data.tenantName || 'Tenant'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        alert("Download failed. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Form */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">⚡ Bill Gen</h1>
          <BillForm data={data} handleChange={handleChange} />
          <button 
            onClick={handleDownload}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-xl font-bold shadow-lg mt-4 active:scale-95 transition-transform"
          >
            📥 Download Receipt
          </button>
        </div>

        {/* Right Side: Preview */}
        <div className="w-full md:w-1/2 flex justify-center bg-gray-200 p-4 rounded-xl border border-gray-300">
          <BillTemplate data={data} ref={receiptRef} />
        </div>
      </div>
    </div>
  );
}

export default App;