const path = require("path");
const express = require('express');
const connectDB = require('./config/db');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require('express-handlebars'); 
const passport = require("passport");
const session = require('express-session');
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')(session);
// handlebars helper
const {formatDate , stripTags , truncate , editIcon}= require('./helper/hbs');
//load config
dotenv.config({path : './config/config.env'});
//require passport 
require('./config/passport')(passport)

connectDB();
const app = express();

//body parser 
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//method override
// Method override
app.use(methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )

//
if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'));
    console.log('app is in development state')
}
app.engine('.hbs' , exphbs({helpers:{
    formatDate, stripTags , truncate, editIcon
} , defaultlayout:'main', extname:'.hbs'}));
app.set('view engine' , '.hbs');

//session 
app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:false,
    store: new MongoStore({mongooseConnection:mongoose.connection})
    
}))

//passport midleware 
app.use(passport.initialize());
app.use(passport.session())

app.use(function(req , res , next){
res.locals.user = req.user || null
next()
})
//Router 
app.use('/' , require('./routes/index.js'))
app.use('/auth' , require('./routes/auth'))
app.use('/stories', require('./routes/stories'))
app.use(express.static(path.join(__dirname , 'public')));

const Port = process.env.PORT || 3000; 

app.listen(Port , console.log(`server  running in ${process.env.NODE_ENV} and made on port ${Port}`));
