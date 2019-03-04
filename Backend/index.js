const express=require('express');
const app=express();
var methodOverride=require('express-method-override');
const bodyParser=require('body-parser');
const session=require('express-session');
const cookieParser=require('cookie-parser');
var cors = require('cors');


const signupRoute=require("./routes/signup");
const loginRoute=require("./routes/login");
const logoutRoute=require("./routes/logout")
const dashboardRoute=require("./routes/dashboard");
const coursesRoute=require("./routes/courses")
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(cookieParser());
//install cross origin reference 
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(session({
    key:'user_sid',
    secret:'lab1 pro',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:30*1000*60
    }

}));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


app.use((req,res,next)=>{
    if(req.cookies.user_sid && !req.session.user){
        res.clearCookie('user_sid');
    }
    next();
});
app.get('/',function(req,res){ 
    res.render('login');
    
})
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'Canvas',
    user     : 'root',
    password : '',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
}); 

connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});

//connection.end();
//This example creates a MySQL connection object that connects to the MySQL database. A
/*app.use("/signup",signupRoute)
app.use("/login",loginRoute)
app.use("logout",logoutRoute)
app.use("/dashboard",dashboardRoute)
app.use("/courses",coursesRoute)*/
app.listen(3001, _=>console.log("server running on 3001"));