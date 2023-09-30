const express = require('express');
const mongoose= require('mongoose');
require('dotenv').config();

const morgan = require('morgan');


const app= express()
app.use(morgan('tiny'))

const PORT = process.env.PORT || 4000
const authRoutes = require('./routes/authRoutes')
const todoRoutes = require('./routes/todoRoutes')
//middlewares in 

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//connection to mongo db

async function connect() {
    try {
      await mongoose.connect(process.env.MONGOURI,{
        // useFindAndModify: false, 
        useNewUrlParser: true,  
         });
      console.log('Connected to MongoDB!');
    } catch (error) {
      console.log(error);
    }
  }
  
  connect();
  // app.get('/', (req, res) => {
  //   res.send('Hello World!')

  // })

  app.use('/api/auth', authRoutes)
  app.use('/api/todos', todoRoutes)
  

  

 app.listen(PORT, ()=> {
    console.log(`server running at ${PORT}`)
 })
