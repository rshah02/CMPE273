var express = require('express');
var router = express.Router();
//const users = require('../data/user')
const bodyParser = require('body-parser');
router.use(bodyParser.json());

/*router.get('/', function (req, res) {
    if (req.session.user) {
        res.render('');
    } else {
        res.render('login');
    }
}); */

/*router.post('/', function (req, res) {
    if (req.session.user) {
        res.render('home');

         } else {
      
        users.filter(function (user) {
                if (user.username === req.body.username && user.password === req.body.password) {
                req.session.user = user;
                res.redirect('home');
            }
            else {
                     console.log("out");
                     res.redirect('login');
                           
            } 
        });
        // users.filter(function(user){if(user.username === req.body.username && user.password === req.body.password){req.session.user = user;res.redirect('/home');}})
    }
}); */

//router.post('/',function(req,res){
    
       // console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
   // console.log("Req Body : ",req.body);
    //users.filter(function(user){
     /*  if(user.username === req.body.username && user.password === req.body.password){
            res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
          //  req.session.user = user;
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end("Successful Login");
        }
    });
});
// Create application/json parser
var jsonParser = bodyParser.json();*/


module.exports = router;