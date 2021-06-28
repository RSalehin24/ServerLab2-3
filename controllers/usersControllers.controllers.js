const Users = require("./../models/users.model");
const bcrypt = require("bcryptjs");


const getRegister = (req, res) => {
    res.sendFile("register.html", {root:"./views"});
};

const postRegister = (req, res) => {

    const { username, gender, email, password, repeatPassword } = req.body;

    if(password == repeatPassword && password.length >6){
        Users.findOne({ email: email }).exec(async (error, user) => {
            
            if (user) {
              return res.redirect("/register");
            } else {
                const newUser = new Users({
                    username,
                    gender,
                    email,
                    password,
                  });
              
                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err){ return res.status(400).json({
                              message: "User already registered",
                          });
                      }
                          newUser.password = hash;
                          newUser
                              .save()
                              .catch((err) => console.log(err));
                      });
                  });
                res.redirect('/login');
            }
        }); 
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
              return res.send(`Welcome, ${user.username}!`);
            } else {
              return res.redirect('/login');
            }
          });
        } else {
            return res.redirect('/login');
        }
      });
};

module.exports = {getRegister, postRegister, getLogin, postLogin};