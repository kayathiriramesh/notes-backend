const Express= require("express");
const router= Express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel= require("../Models/UserModels")
const JWT_SECRET_KEY="digital-notes-app-backend";
const updateUserOptions = {
    runValidators: true,
  };


  router.post("/user-register", async (req, res, next) => {
    const { body } = req;
  
    if (body.password) {
      req.body.hashedPassword = await bcrypt.hash(body.password, 10); 
    }
    const UserInstance = new UserModel({
      email: body.email,
      password: body.hashedPassword
    });
    UserInstance.save()
      .then((response) => {
        if (response._id) {
          res.status(200).json({
            message: "User registered",
            data: response,
          });
        }
      })
      .catch((err) => {
        if (err) {
            // console.log(UserInstance);
          res.status(400).json({
            message: err.message,
            error: err,
          });
        }
      });
  });

  
  router.get("/user-login", (req, res, next) => {
    const { email, password } = req.body;
      UserModel.find({email : email})
      .then(async (response) => {
        if (response.length > 0) {
          const hashedPass = response[0].password;
          // Load hash from your password DB.
          const match = await bcrypt.compare(password, hashedPass);
          if (match) {
            const token = jwt.sign(
                {
                  email: response[0].email
                },
                JWT_SECRET_KEY,
                { expiresIn: 60 * 60 }
              );
              //console.log(token);
              res.status(200).json({
                message: "Logged in successfully!!!",
                data: response,
                token: token,
              });
            } else {
              res.status(200).json({
                message: "Email or password don't match",
                data: response,
              });
            }
          } else {
            res.status(200).json({
              message: "No users found!!!",
              data: response,
            });
          }
        })
        .catch((err) => {
          if (err) {
            res.status(400).json({
              message: err.message,
              error: err,
            });
          }
        });
    });


    module.exports=router;