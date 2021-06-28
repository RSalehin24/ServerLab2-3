const Users = require("./../models/users.model");
const bcrypt = require("bcryptjs");
const alert = require('alert');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


const getRegister = (req, res) => {
    res.sendFile("register.html", {root:"./views"});
};

const postRegister = (req, res) => {

    const { name, gender, email, password, repeatPassword } = req.body;

    if(password == repeatPassword && password.length > 5){
        Users.findOne({ email: email }).exec(async (error, user) => {
            
            if (user) {
                alert('User already axists. Please login using your credentials.');
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
                          alert('Error! Please try again.');
                          return res.redirect("/register");
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
        alert('Password and Retype Password does not match. Please enter info again.');
        res.redirect('/register');
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
              alert('Password does not match. Please try again.');  
              return res.redirect('/login');
            }
          });
        } else {
            alert("User doesn't exist. Please register first."); 
            return res.redirect('/register');
        }
      });
};

const getDashboard = (req, res) => {
    const user = localStorage.getItem("name");
    
    if (user){
        res.send(`Welcome, ${user}!`);
        localStorage.removeItem("name");
    }else {
        alert('Please log in first');
        res.redirect('/login');
    }
}

module.exports = {getRegister, postRegister, getLogin, postLogin, getDashboard};