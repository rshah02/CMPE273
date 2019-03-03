const express=require('express');
const app=express();
var methodOverride=require('express-method-override');
const bodyParser=require('body-parser');
const session=require('express-session');
const cookieParser=require('cookie-parser');

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
app.use(session({
    key:'user_sid',
    secret:'lab1 pro',
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:30*1000*60
    }

}));

app.use((req,res,next)=>{
    if(req.cookies.user_sid && !req.session.user){
        res.clearCookie('user_sid');
    }
    next();
});
app.get('/',function(req,res){
    res.render('login')
})
/*app.use("/signup",signupRoute)
app.use("/login",loginRoute)
app.use("logout",logoutRoute)
app.use("/dashboard",dashboardRoute)
app.use("/courses",coursesRoute)*/
app.listen(3001, _=>console.log("server running on 3001"));