import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getInstructorEarnings } from '../../api/axios';

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
  });
};

export default function InstructorEarnings() {
  // Fetch Earnings
  const { data: earnings, isLoading, isError } = useQuery({
    queryKey: ['instructor-earnings'],
    queryFn: getInstructorEarnings,
  });

  if (isLoading) return <div className="p-20 text-center text-gray-500 font-bold">Loading earnings...</div>;
  if (isError) return <div className="p-20 text-center text-red-500 font-bold">Failed to load earnings data.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="w-full px-6 md:px-12 pt-12 pb-32" style={{ background: 'linear-gradient(to right, #FAF3E1, #F5E7C6)' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black mb-2" style={{ color: '#1d120c' }}>
            My Earnings
          </h1>
          <div className="flex items-center gap-2 group cursor-help relative">
            <p className="text-sm" style={{ color: '#a16545' }}>
              Track your sales and revenue share (75%)
            </p>
            <svg className="w-4 h-4" style={{ color: '#a16545' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="absolute top-8 left-0 z-50 invisible group-hover:visible bg-gray-900 text-white text-xs rounded-lg p-3 w-64 shadow-xl">
              The platform retains a 25% fee for hosting, marketing, and processing. You receive 75% of every sale made.
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 -mt-24 pb-12">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Total Sales */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm font-medium mb-2" style={{ color: '#a16545' }}>
              Total Sales (Gross)
            </p>
            <p className="text-3xl font-bold" style={{ color: '#1d120c' }}>
              {formatCurrency(earnings?.total_sales)}
            </p>
          </div>

          {/* Net Earnings */}
          <div className="bg-white rounded-xl p-6 shadow-md border-2" style={{ borderColor: '#ff6d1f' }}>
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium" style={{ color: '#a16545' }}>
                Net Earnings (75%)
              </p>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(255,109,31,.1)', color: '#ff6d1f' }}>
                ACTIVE
              </span>
            </div>
            <p className="text-3xl font-black" style={{ color: '#ff6d1f' }}>
              {formatCurrency(earnings?.net_earnings)}
            </p>
          </div>

          {/* Sales Count */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <p className="text-sm font-medium mb-2" style={{ color: '#a16545' }}>
              Sales Count
            </p>
            <p className="text-3xl font-bold" style={{ color: '#1d120c' }}>
              {earnings?.sales_count || 0}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        {/* <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
              <button className="px-4 py-2 text-sm font-bold rounded-md shadow-sm" style={{ backgroundColor: '#ff6d1f', color: '#ffffff' }}>
                All Time
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:text-orange-600 text-gray-600">
                Last 30 Days
              </button>
              <button className="px-4 py-2 text-sm font-medium hover:text-orange-600 text-gray-600">
                This Month
              </button>
            </div>

            <div className="flex gap-3">
              <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Custom Range
              </button>
              <button className="flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm text-white" style={{ backgroundColor: '#ff6d1f' }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>
        </div> */}

        {/* Sales History Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-lg" style={{ color: '#1d120c' }}>
              Sales History
            </h3>
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#a16545' }}>
              Recent Transactions
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#a16545' }}>Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#a16545' }}>Course Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#a16545' }}>Student</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider" style={{ color: '#a16545' }}>Gross Amount</th>
                  <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider" style={{ color: '#a16545' }}>My Share (75%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {earnings?.sales_history?.length > 0 ? (
                  earnings.sales_history.map((sale) => (
                    <tr key={sale.transaction_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(sale.date)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-sm max-w-xs truncate" style={{ color: '#1d120c' }} title={sale.course_title}>
                        {sale.course_title}
                      </td>
                      <td className="px-6 py-4 text-sm" style={{ color: '#1d120c' }}>
                        {sale.student_name}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium" style={{ color: '#1d120c' }}>
                        {formatCurrency(sale.amount)}
                      </td>
                      <td className="px-6 py-4 text-right font-bold" style={{ color: '#ff6d1f' }}>
                        {formatCurrency(sale.my_share)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-gray-400 italic">
                      No sales recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
            <p className="text-sm" style={{ color: '#a16545' }}>
              Showing {earnings?.sales_history?.length || 0} transactions
            </p>
            {/* <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-30" disabled>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}