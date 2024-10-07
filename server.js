//add dependencies that were added in the package.json file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items =require('./routes/api/items');
const accounts =require('./routes/api/accounts');

const app=express();

//Body Parser Middleware
app.use(bodyParser.json());

//Mongo DB can be utilized from mlab.com -> Mongo DB Hosting

//Config File Abstraction
const db= require('./config/keys').mongoURI;

//Connect to Mongo Database
mongoose
	.connect(db)
	.then(()=>console.log('Mongo Database Successfully connected!'))
	.catch(err=> console.log(err));


//use Routes for DB manipulation --> refer to items 
app.use('/api/items',items);
//use Routes for DB manipulation --> refer to accounts 
app.use('/api/accounts',accounts);


//Declare port for server -> environment variable or port 5000, allow server to listen on that port
const port=process.env.PORT || 5000;
app.listen(port, ()=>console.log(`Server Started on port ${port}`));
