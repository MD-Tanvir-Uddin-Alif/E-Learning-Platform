import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyPaymentHistory } from '../../api/axios'; 

const formatCurrency = (amount, currency = 'BDT') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount || 0);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function StudentPaymentHistory() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Fetch Payment History
  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ['my-payment-history'],
    queryFn: getMyPaymentHistory,
  });

  // Client-side Filtering (though API returns mostly completed)
  const filteredPayments = payments.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'successful') return p.status === 'completed';
    if (activeTab === 'pending') return p.status === 'pending'; // In case API is updated to return all statuses
    return true;
  });

  if (isLoading) return <div className="p-20 text-center text-[#222222]/50 font-bold">Loading payment history...</div>;
  if (isError) return <div className="p-20 text-center text-red-500 font-bold">Failed to load payments.</div>;

  return (
    <div className="layout-container flex flex-col font-['Lexend'] bg-[#f8f6f5] min-h-screen">
      <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800;900&family=Material+Symbols+Outlined:opsz,wght,FILL@20..48,100..700,0..1&display=swap" rel="stylesheet" />

      {/* ----------  PAGE HEADER  ---------- */}
      <div
        className="w-full h-24 border-b flex items-center shadow-sm px-4 md:px-10"
        style={{ backgroundColor: '#F5E7C6', borderColor: 'rgba(0,0,0,.05)' }}
      >
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center">
          <h1 className="text-3xl font-black tracking-tight" style={{ color: '#222222' }}>Payment History</h1>
          <div
            className="px-4 py-2 rounded-full shadow-sm flex items-center gap-2"
            style={{ backgroundColor: '#ffffff' }}
          >
            <span className="font-bold" style={{ color: '#ff6d1f' }}>{payments.length}</span>
            <span className="text-sm" style={{ color: 'rgba(0,0,0,.5)' }}>Payments total</span>
          </div>
        </div>
      </div>

      {/* ----------  MAIN CONTENT  ---------- */}
      <main className="max-w-4xl mx-auto w-full p-6 space-y-4">
        {/* Tabs Navigation */}
        <div className="pb-4">
          <div className="flex border-b px-4 gap-8" style={{ borderColor: 'rgba(0,0,0,.05)' }}>
            {['all', 'successful', 'pending'].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${activeTab === tab ? 'border-[#ff6d1f]' : 'border-transparent'}`}
                >
                    <p className={`text-sm font-bold tracking-[0.015em] capitalize ${activeTab === tab ? 'text-[#1d120c]' : 'text-black/50 hover:text-black/80'}`}>
                        {tab === 'all' ? 'All Payments' : tab}
                    </p>
                </button>
            ))}
          </div>
        </div>

        {/* Receipt Card List */}
        <div className="space-y-4">
          {filteredPayments.length > 0 ? (
            filteredPayments.map((payment) => (
              <div
                key={payment.transaction_id}
                className="receipt-card group relative rounded-[20px] p-6 flex flex-col md:flex-row items-start md:items-center justify-between shadow-sm border border-transparent hover:border-[#ff6d1f]/20 transition-all duration-200"
                style={{ backgroundColor: '#ffffff' }}
              >
                <div className="flex items-start gap-5 flex-1 w-full md:w-auto">
                  <div
                    className="flex items-center justify-center rounded-xl shrink-0 size-14"
                    style={{ color: '#ff6d1f', backgroundColor: 'rgba(255,109,31,.1)' }}
                  >
                    <span className="material-symbols-outlined text-3xl">receipt_long</span>
                  </div>
                  <div className="flex flex-col gap-1 w-full overflow-hidden">
                    <h3 className="text-lg font-bold truncate" style={{ color: '#222222' }}>{payment.course_title}</h3>
                    <p className="text-sm font-medium truncate" style={{ color: 'rgba(0,0,0,.5)' }}>
                      Transaction ID: <span style={{ color: 'rgba(0,0,0,.7)' }}>#{payment.transaction_id.substring(0, 12)}...</span>
                    </p>
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'rgba(0,0,0,.4)' }}>
                      {formatDate(payment.date)}
                    </p>
                  </div>
                </div>

                <div className="flex w-full md:w-auto mt-4 md:mt-0 justify-between md:justify-end items-center md:gap-8">
                    <div
                    className="flex flex-col items-start md:items-center gap-2 md:px-8 md:border-x border-r-0"
                    style={{ borderColor: 'rgba(0,0,0,.05)' }}
                    >
                    <div
                        className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl px-4"
                        style={{ backgroundColor: payment.status === 'completed' ? 'rgba(22,163,74,.1)' : 'rgba(255,109,31,.1)' }}
                    >
                        <span className="size-2 rounded-full" style={{ backgroundColor: payment.status === 'completed' ? '#16a34a' : '#ff6d1f' }} />
                        <p className="text-xs font-bold uppercase tracking-wide" style={{ color: payment.status === 'completed' ? '#16a34a' : '#ff6d1f' }}>
                            {payment.status}
                        </p>
                    </div>
                    <p className="text-xs font-medium" style={{ color: 'rgba(0,0,0,.5)' }}>via {payment.payment_method}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1 md:gap-3 pl-0 md:pl-8 min-w-[140px]">
                        <p className="text-xl font-extrabold leading-none" style={{ color: '#222222' }}>
                            {formatCurrency(payment.amount, payment.currency)}
                        </p>
                        <button 
                            onClick={() => setSelectedReceipt(payment)}
                            className="card-hover-action flex items-center gap-1 text-sm font-bold hover:underline" 
                            style={{ color: '#ff6d1f' }}
                        >
                            View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
              </div>
            ))
          ) : (
             <div className="flex flex-col items-center justify-center py-20 text-center">
                <div
                    className="size-24 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: 'rgba(255,109,31,.1)' }}
                >
                    <span className="material-symbols-outlined text-5xl" style={{ color: '#ff6d1f' }}>payments</span>
                </div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#222222' }}>No payments found</h2>
                <p className="mb-8 max-w-sm" style={{ color: 'rgba(0,0,0,.5)' }}>
                    It looks like you haven't made any transactions matching this filter.
                </p>
             </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedReceipt && (
            <div
            className="fixed inset-0 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,.4)' }}
            onClick={() => setSelectedReceipt(null)}
            >
            <div
                className="rounded-[24px] max-w-md w-full shadow-2xl overflow-hidden animate-[slideDown_0.3s_ease-out]"
                style={{ backgroundColor: '#FAF3E1' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-8 text-center space-y-6">
                <div className="flex justify-between items-start">
                    <div className="size-10" />
                    <div
                    className="size-16 rounded-full shadow-sm flex items-center justify-center mx-auto"
                    style={{ backgroundColor: '#ffffff', color: '#ff6d1f' }}
                    >
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                    </div>
                    <button onClick={() => setSelectedReceipt(null)} style={{ color: 'rgba(0,0,0,.4)' }}>
                    <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div>
                    <h2
                    className="text-sm font-bold uppercase tracking-widest mb-1"
                    style={{ color: 'rgba(0,0,0,.5)' }}
                    >
                    Receipt for
                    </h2>
                    <p className="text-xl font-bold px-4" style={{ color: '#222222' }}>
                    {selectedReceipt.course_title}
                    </p>
                </div>

                <div className="py-4 border-y" style={{ borderColor: 'rgba(0,0,0,.05)' }}>
                    <p className="text-[42px] font-black leading-none" style={{ color: '#ff6d1f' }}>
                        {formatCurrency(selectedReceipt.amount, selectedReceipt.currency)}
                    </p>
                    <p className="text-sm mt-2" style={{ color: 'rgba(0,0,0,.4)' }}>
                        Payment successful on {new Date(selectedReceipt.date).toLocaleDateString()}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6 text-left">
                    <div>
                    <p className="text-xs font-bold uppercase tracking-tighter" style={{ color: 'rgba(0,0,0,.4)' }}>
                        Transaction ID
                    </p>
                    <p className="font-bold text-sm break-all" style={{ color: '#222222' }}>
                        #{selectedReceipt.transaction_id}
                    </p>
                    </div>
                    <div>
                    <p className="text-xs font-bold uppercase tracking-tighter" style={{ color: 'rgba(0,0,0,.4)' }}>
                        Date & Time
                    </p>
                    <p className="font-bold text-sm" style={{ color: '#222222' }}>
                        {formatDate(selectedReceipt.date)}
                    </p>
                    </div>
                    <div>
                    <p className="text-xs font-bold uppercase tracking-tighter" style={{ color: 'rgba(0,0,0,.4)' }}>
                        Status
                    </p>
                    <p className="font-bold" style={{ color: '#16a34a' }}>Completed</p>
                    </div>
                    <div>
                    <p className="text-xs font-bold uppercase tracking-tighter" style={{ color: 'rgba(0,0,0,.4)' }}>
                        Method
                    </p>
                    <p className="font-bold" style={{ color: '#222222' }}>{selectedReceipt.payment_method}</p>
                    </div>
                </div>

                <button
                    className="w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.98]"
                    style={{ backgroundColor: '#ff6d1f', color: '#ffffff', boxShadow: '0 10px 15px -3px rgba(255,109,31,.3)' }}
                    onClick={() => window.print()}
                >
                    <span className="material-symbols-outlined">download</span>
                    Download Receipt
                </button>
                </div>
            </div>
            </div>
        )}
      </main>


      <style>{`@keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}