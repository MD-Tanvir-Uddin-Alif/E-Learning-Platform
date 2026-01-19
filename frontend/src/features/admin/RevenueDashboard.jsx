import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAdminEarnings } from '../../api/axios'; 

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
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

export default function RevenueDashboard() {
  // Fetch Earnings Data
  const { data: earnings, isLoading, isError } = useQuery({
    queryKey: ['admin-earnings'],
    queryFn: getAdminEarnings,
  });

  if (isLoading) return <div className="p-20 text-center text-gray-500 font-bold">Loading revenue data...</div>;
  if (isError) return <div className="p-20 text-center text-red-500 font-bold">Failed to load revenue data.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="w-full px-6 md:px-12 pt-12 pb-32" style={{ background: 'linear-gradient(to bottom, #F5E7C6, rgba(245,231,198,.2))' }}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black mb-2" style={{ color: '#1d120c' }}>
              Revenue & Payouts
            </h1>
            <p className="text-lg font-medium" style={{ color: '#ff6d1f' }}>
              Manage e-learning earnings and splits
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gross Revenue */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Gross Revenue
                </p>
                <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20" title="Total sales before splits">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-2xl font-black" style={{ color: '#222222' }}>
                {formatCurrency(earnings?.total_gross_revenue)}
              </p>
            </div>

            {/* Admin Net */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Admin Net (25%)
                </p>
                <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20" title="Platform management fee">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-2xl font-black" style={{ color: '#222222' }}>
                {formatCurrency(earnings?.admin_net_revenue)}
              </p>
            </div>

            {/* Instructor Payouts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Instructor (75%)
                </p>
                <svg className="w-4 h-4 text-gray-400 cursor-help" fill="currentColor" viewBox="0 0 20 20" title="Total earnings for instructors">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-2xl font-black" style={{ color: '#222222' }}>
                {formatCurrency(earnings?.total_instructor_payouts)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transactions Table */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 -mt-24 pb-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-bold" style={{ color: '#1d120c' }}>
              Transaction History
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#ff6d1f' }}>
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#ff6d1f' }}>
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#ff6d1f' }}>
                    Instructor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#ff6d1f' }}>
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#ff6d1f' }}>
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#ff6d1f' }}>
                    Shares (25/75)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {earnings?.transactions?.length > 0 ? (
                  earnings.transactions.map((tx) => (
                    <tr key={tx.transaction_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-gray-400 truncate block max-w-[80px]" title={tx.transaction_id}>
                          #{tx.transaction_id.substring(0, 6)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm truncate max-w-xs" style={{ color: '#222222' }} title={tx.course_title}>
                          {tx.course_title}
                        </p>
                        <p className="text-xs text-gray-400">
                          Course ID: {tx.transaction_id.substring(0, 4)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium truncate block max-w-[150px]" style={{ color: '#222222' }}>
                          {tx.instructor}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(tx.date)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-black text-sm" style={{ color: '#222222' }}>
                          {formatCurrency(tx.amount)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#ff6d1f' }}>
                            Admin {formatCurrency(tx.admin_share)}
                          </span>
                          <span className="px-3 py-1 rounded-md text-xs font-bold text-white" style={{ backgroundColor: '#222222' }}>
                            Inst. {formatCurrency(tx.instructor_share)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-400 italic">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
            <p className="text-sm font-semibold text-gray-500">
              Showing {earnings?.transactions?.length || 0} transactions
            </p>
            {/* <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-400 hover:bg-gray-100 disabled:opacity-50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded text-white font-bold text-xs" style={{ backgroundColor: '#ff6d1f' }}>
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 text-gray-400 hover:bg-gray-100">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </main>

      {/* Success Toast (Hidden by default) */}
      <div className="fixed bottom-6 right-6 z-50 transform transition-transform duration-300 hidden">
        <div className="bg-white rounded-lg shadow-xl border-l-4 p-4 flex items-center gap-4 min-w-[320px]" style={{ borderColor: '#ff6d1f' }}>
          <div className="p-2 rounded-full" style={{ backgroundColor: 'rgba(255,109,31,.2)' }}>
            <svg className="w-6 h-6" style={{ color: '#ff6d1f' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: '#222222' }}>
              Export Successful
            </p>
            <p className="text-xs text-gray-500">
              Your transaction report is ready for download.
            </p>
          </div>
          <button className="ml-auto text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}