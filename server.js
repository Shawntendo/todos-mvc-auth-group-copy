const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session') //session management

 //store session data in DB?
 //more middleware for session storage
//don't use in prod, can leak memory
const MongoStore = require('connect-mongo')(session)

//popup messages for failed logins, etc ? 
const flash = require('express-flash')

//logs out different requests
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')

require('dotenv').config({path: './config/.env'})

// Passport config - connect to passport config file
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// initialize morgan -> use in dev env't rather than prod
// set format for logging (eg dev has colours, other options incl "tiny" etc)
app.use(logger('dev'))

// Sessions
//keeps us logged in across multiple sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware (initialize passport)
app.use(passport.initialize())
//sets up the session for the user
app.use(passport.session())

//setting flash
app.use(flash())
  
// set up routes
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 

app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is running, you better catch it!')
})    
