import React from 'react'

const ExpenseTable = ({ expenses, deleteExpenses }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full h-full">
      <h2 className="text-3xl font-bold text-center mb-6 text-fuchsia-500">
        Expense List
      </h2>

<div className="space-y-3">
  {expenses.length === 0 ? (
    <div className="text-center text-gray-600 py-10">
      <span className="text-5xl">📭</span>
      <div className="mt-3 text-2xl">No expenses added yet.</div>
      <div className="text-lg mt-1">Start by adding your first expense!</div>
    </div>
  ) : (
    expenses.map((expense, index) => (
      <div key={expense._id} className="flex items-center justify-between border p-3 rounded-lg hover:shadow-md transition">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
          onClick={() => deleteExpenses(expense._id)}
        >
          ✕
        </button>
        <p className="font-medium flex-1 text-center">{expense.text}</p>
        <p className={`text-sm font-semibold ${expense.amount > 0 ? "text-green-600" : "text-red-500"}`}>
          ₹{expense.amount}
        </p>
      </div>
    ))
  )}
</div>

    </div>
  )
}

export default ExpenseTable
