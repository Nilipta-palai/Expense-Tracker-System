const express=require('express');
const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');
const ensureAuthenticated = require('../Middlewares/Auth')

const router=require('express').Router();

//fetch all expenses of user
router.get('/',fetchExpenses)
router.post('/',addExpenses)
router.delete('/:expenseId',ensureAuthenticated,deleteExpenses)

module.exports=router;