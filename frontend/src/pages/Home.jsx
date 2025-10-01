import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';

const Home = () => {
  const [loggedUser,setLoggedInUser]=useState('');
  const [expenses,setExpense]=useState([]);
  const [incomeAmt, setIncomeAmt] = useState(0);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const navigate=useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedUser'))
  },[]);

  useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0)
            .reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0)
            .reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses])

const handleLogout=()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('loggedUser');
  handleSuccess('User Logged Out')
  setTimeout(()=>{
    navigate('/login');
},1000)
}


 const deleteExpenses = async (expenseId) => {
  //console.log("Deleting expense ID:", expenseId);
  try {
    const url = `${APIUrl}/expenses/${expenseId}`;
    const options = {
      method: 'DELETE',
      headers: { 'Authorization': localStorage.getItem('token') }
    };
    const response = await fetch(url, options);
    //console.log("Response status:", response.status);
    const result = await response.json();
    //console.log("Delete result:", result);
    if (response.ok) {
      handleSuccess(result?.message);
      setExpense(result.data);
    } else {
      if (response.status === 403) {
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        handleError(result);
      }
    }
  } catch (err) {
    console.error(err);
    handleError(err);
  }
};

const fetchExpense=async ()=>{
  try{
    const url=`${APIUrl}/expenses`;
    const headers={
      headers:{
        'Authorization':localStorage.getItem('token')

      }
    }
    const response=await fetch(url,headers);
    if(response.status===403){
      navigate('/login');
      return;
    }
    const result=await response.json();
    setExpense(result.data);
    //console.log(result.data)
  }
  catch(err){
    handleError(err);
  }
}

    const addExpenses = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            }
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem('token');
                navigate('/login');
                return
            }
            const result = await response.json();
            handleSuccess(result?.message)
            //console.log('--result', result.data);
            setExpense(result.data);
        } catch (err) {
            handleError(err);
        }
    }

useEffect(()=>{
  fetchExpense()
},[])


  return (
<div className="flex flex-col items-center m-6 min-h-screen
                bg-gradient-to-r from-pink-200 via-pink-100 to-yellow-100
                text-gray-800">
  {/* User info */}
  <div className="mb-6 text-center">
    <h1 className="text-5xl font-bold"> Welcome {loggedUser}</h1>
    <button 
      onClick={handleLogout} 
      className="bg-yellow-300 px-4 py-2 mt-2 rounded-md hover:bg-yellow-500"
    >
      Logout
    </button>
  </div>
  {/* Expense List */}
  <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
  <div className="flex flex-col md:flex-row w-full gap-6">
    <div className="md:w-1/2 w-full">
      <ExpenseForm addExpenses={addExpenses} />
    </div>
    <div className="md:w-1/2 w-full">
      <ExpenseTable expenses={expenses} deleteExpenses={deleteExpenses} />
    </div>
  </div>
  <ToastContainer/>
</div>


  )
}

export default Home