import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseForm({ addExpenses }) {
  const [expenseInfo, setExpenseInfo] = useState({
    amount: '',
    text: '',
    date: '',
    type: 'income', // default toggle value
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpenses = (e) => {
    e.preventDefault();
    const { amount, text, type } = expenseInfo;
    if (!amount || !text) {
      handleError('Please add Expense Details');
      return;
    }

    // Convert amount sign based on type
    const signedAmount = type === 'expense' ? -Math.abs(Number(amount)) : Math.abs(Number(amount));

    // Pass updated expense info with signed amount
    addExpenses({ ...expenseInfo, amount: signedAmount });

    setTimeout(() => {
      setExpenseInfo({ amount: '', text: '', date: '', type: 'income' });
    }, 1000);
  };

  return (
    <div className="bg-gray-100 p-10 w-full shadow-lg rounded-lg self-start">
      <h1 className="mb-4 text-3xl text-fuchsia-500 font-bold text-center">
        Expense Tracker
      </h1>

      <form onSubmit={handleExpenses}>

        {/* Toggle Buttons */}
        <div className="mb-4 flex justify-center gap-6 text-2xl">
          <label className="inline-flex items-center ">
            <input
              type="radio"
              name="type"
              value="income"
              checked={expenseInfo.type === 'income'}
              onChange={handleChange}
              className="mr-2"
            />
            Income
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="type"
              value="expense"
              checked={expenseInfo.type === 'expense'}
              onChange={handleChange}
              className="mr-2"
            />
            Expense
          </label>
        </div>

        <div className="mb-4">
          <label className="text-xl">Expense Detail :</label>
          <input
            onChange={handleChange}
            type="text"
            name="text"
            placeholder="Enter your Expense Detail..."
            className="block w-full border p-2 mt-1"
            value={expenseInfo.text}
          />
        </div>

        <div className="mb-4">
          <label className="text-xl">Amount :</label>
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            placeholder="Enter your Amount..."
            className="block w-full border p-2 mt-1"
            value={expenseInfo.amount}
          />
        </div>

        <div className="mb-4">
          <label className="text-xl">Date :</label>
          <input
            onChange={handleChange}
            type="date"
            name="date"
            className="block w-full border p-2 mt-1"
            value={expenseInfo.date}
          />
        </div>

        <button className="w-full bg-fuchsia-500 text-white py-2 rounded hover:bg-fuchsia-800">
          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
