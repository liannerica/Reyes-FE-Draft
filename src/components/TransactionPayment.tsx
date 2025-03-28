import { useState } from "react";
import { Link } from "react-router-dom";

interface Transaction {
  id: number;
  item: string;
  amount: number;
  status: string;
  customerName: string;
  transactionTime?: string;
}

export default function SellerTransaction() {
  const [transactions] = useState<Transaction[]>([
    { id: 1, item: "Painting A", amount: 200, status: "UNPAID", customerName: "John Doe", transactionTime: "2025-03-28T13:00:00" },
    { id: 2, item: "Sculpture B", amount: 500, status: "COMPLETED", customerName: "Jane Smith", transactionTime: "2025-03-28T15:45:00" },
    { id: 3, item: "Vintage Clock", amount: 350, status: "FAILED", customerName: "Alice Brown", transactionTime: "2025-03-28T14:15:00" },
  ]);

  return (
    <div className="min-h-screen p-6">
      <div className="container max-w-6xl mx-auto space-y-6 mt-8">
        {/* Painting A Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-xl mb-4 flex items-center text-[#5A3A31]">
            Painting A
          </h3>
          {transactions.filter(tx => tx.item === "Painting A").map((tx) => (
            <div
              key={tx.id}
              className="mb-3 p-3 bg-[#AA8F66]/10 rounded-lg hover:bg-[#AA8F66]/20 transition-colors"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[#5A3A31]">Customer: {tx.customerName}</p>
                <p className="text-sm text-[#5A3A31]">Amount: ${tx.amount}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-[#5A3A31]/70">
                  {new Date(tx.transactionTime || '').toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${tx.status === 'UNPAID' ? 'bg-yellow-100 text-yellow-800' : 
                      tx.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 
                      'bg-red-100 text-red-800'}`}
                >
                  {tx.status}
                </span>
              </div>
              <Link 
                to={`/seller/transactions/payment/${tx.id}?customer=${encodeURIComponent(tx.customerName)}&amount=${tx.amount}&status=${tx.status}&transactionTime=${tx.transactionTime}&item=${encodeURIComponent(tx.item)}`}
                className="block mt-3 text-center bg-[#AA8F66] hover:bg-[#8D7456] text-white py-2 rounded-md transition-colors duration-300"
              >
                View Payment Details
              </Link>
            </div>
          ))}
        </div>

        {/* Sculpture B Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-xl mb-4 flex items-center text-[#5A3A31]">
            Sculpture B
          </h3>
          {transactions.filter(tx => tx.item === "Sculpture B").map((tx) => (
            <div
              key={tx.id}
              className="mb-3 p-3 bg-[#AA8F66]/10 rounded-lg hover:bg-[#AA8F66]/20 transition-colors"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[#5A3A31]">Customer: {tx.customerName}</p>
                <p className="text-sm text-[#5A3A31]">Amount: ${tx.amount}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-[#5A3A31]/70">
                  {new Date(tx.transactionTime || '').toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${tx.status === 'UNPAID' ? 'bg-yellow-100 text-yellow-800' : 
                      tx.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 
                      'bg-red-100 text-red-800'}`}
                >
                  {tx.status}
                </span>
              </div>
              <Link 
                to={`/seller/transactions/payment/${tx.id}?customer=${encodeURIComponent(tx.customerName)}&amount=${tx.amount}&status=${tx.status}&transactionTime=${tx.transactionTime}&item=${encodeURIComponent(tx.item)}`}
                className="block mt-3 text-center bg-[#AA8F66] hover:bg-[#8D7456] text-white py-2 rounded-md transition-colors duration-300"
              >
                View Payment Details
              </Link>
            </div>
          ))}
        </div>

        {/* Vintage Clock Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-xl mb-4 flex items-center text-[#5A3A31]">
            Vintage Clock
          </h3>
          {transactions.filter(tx => tx.item === "Vintage Clock").map((tx) => (
            <div
              key={tx.id}
              className="mb-3 p-3 bg-[#AA8F66]/10 rounded-lg hover:bg-[#AA8F66]/20 transition-colors"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-[#5A3A31]">Customer: {tx.customerName}</p>
                <p className="text-sm text-[#5A3A31]">Amount: ${tx.amount}</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-[#5A3A31]/70">
                  {new Date(tx.transactionTime || '').toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium 
                    ${tx.status === 'UNPAID' ? 'bg-yellow-100 text-yellow-800' : 
                      tx.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 
                      'bg-red-100 text-red-800'}`}
                >
                  {tx.status}
                </span>
              </div>
              <Link 
                to={`/seller/transactions/payment/${tx.id}?customer=${encodeURIComponent(tx.customerName)}&amount=${tx.amount}&status=${tx.status}&transactionTime=${tx.transactionTime}&item=${encodeURIComponent(tx.item)}`}
                className="block mt-3 text-center bg-[#AA8F66] hover:bg-[#8D7456] text-white py-2 rounded-md transition-colors duration-300"
              >
                View Payment Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}