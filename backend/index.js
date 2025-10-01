const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const AuthRouter = require('./Routes/AuthRoutes');
const ExpenseRouter=require('./Routes/ExpenseRouter')
const ensureAuthenticated = require('./Middlewares/Auth')
require('dotenv').config();
require('./Models/db')
const path=require('path');
//define port
const PORT= process.env.PORT || 8080;

//it extracts the file path
const _dirname=path.resolve();
//route to check the database connection
app.get('/start',(req,res)=>{
    res.send("hello")
})

//fetch data from client side and parse it json
app.use(express.json());
app.use(bodyParser.json());

//cors allows all to the application
app.use(cors(
    {
        origin:"https://expense-tracker-system-87kn.onrender.com",
        credentials:true
    }
));

//for all requests
app.use('/auth',AuthRouter);
app.use('/expenses',ensureAuthenticated,ExpenseRouter);

//after build the project it wraps all the component in index.html file inside dist folder
app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(_dirname,"frontend","dist","index.html"))
})

//to start the server
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})