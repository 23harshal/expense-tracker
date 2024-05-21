import express from "express"

import { registerUser, loginUser } from "../controller/user.controller.js";

const route = express.Router();


route.post('/register' , registerUser)
route.post('/login', loginUser)
// route.get('/profile', verifyToken, userProfile)

route.post("/logout" , (req, res)=>{
  res.cookie("access_token", "",{
    expires : new Date(0),
  });
  res.send()
});



export default route;