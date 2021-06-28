const Users = require("./../models/users.model");
const bcrypt = require("bcryptjs");
const alert = require('alert');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const isLoggedIn = (req, res) => {
}

const getRegister = (req, res) => {
    res.sendFile("register.html", {root:"./views"});
};

const postRegister = (req, res) => {

    const { name, gender, email, password, repeatPassword } = req.body;

    if(password == repeatPassword && password.length > 6){
        Users.findOne({ email: email }).exec(async (error, user) => {
            
            if (user) {
                alert('User already axists');
                return res.redirect("/login");
            } else {
                const newUser = new Users({
                    name,
                    gender,
                    email,
                    password,
                  });
              
                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err){ 
                          alert('User already axists');
                          return res.redirect("/login");
                      }
                          newUser.password = hash;
                          newUser
                              .save()
                              .catch((err) => console.log(err));
                      });
                  });
                alert('User has been added Successfully. Please login using your credentials.');
                res.redirect('/login');
            }
        }); 
    } else {
        alert('Password and Retype Password does not match');
        res.redirect('/login');
    }
};
  

const getLogin = (req, res) => {
    res.sendFile("login.html", {root:"./views"});
}



const postLogin = (req, res) =>{

    Users.findOne({
        email: req.body.email,
      }).exec((error, user) => {
        if (error) return res.redirect('/login');
        if (user) {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (isMatch) {
                localStorage.setItem('name', user.name)
              return res.redirect('/dashboard');
            } else {
              return res.redirect('/login');
            }
          });
        } else {
            return res.redirect('/login');
        }
      });
};

const getDashboard = (req, res) => {
    const user = localStorage.getItem("name");
    
    if (user){
        res.send(`Welcome, ${user}!`);
        next()
    }else {
        alert('Please log in first');
        res.redirect('/login');
    }
}

module.exports = {getRegister, postRegister, getLogin, postLogin, getDashboard};