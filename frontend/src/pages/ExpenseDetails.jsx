import React from 'react'

const ExpenseDetails = ({ incomeAmt, expenseAmt }) => {
  const balance = incomeAmt - expenseAmt;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center mb-6">
      {/* Balance */}
      <h2 className="text-2xl font-semibold mb-4">
        Your Balance is <span className="text-purple-600">₹{balance}</span>
      </h2>

      {/* Income & Expense Row */}
      <div className="flex justify-around items-center">
        <div className="text-center">
          <p className="font-bold text-gray-700 text-xl">Income</p>
          <p className="text-green-600 font-bold text-xl">₹{incomeAmt}</p>
        </div>
        <div className="w-px h-10 bg-gray-300"></div> {/* Divider */}
        <div className="text-center">
          <p className="font-bold text-gray-700 text-xl">Expense</p>
          <p className="text-red-500 font-bold text-xl">₹{expenseAmt}</p>
        </div>
      </div>
    </div>
  )
}

export default ExpenseDetails
