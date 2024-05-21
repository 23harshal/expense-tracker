import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const verifyToken = async(req, res, next) => {
    
    try {
        const token = req.cookies?.['access_token'] || req.header("Authorization")?.replace("Bearer ", "")
        
        // console.log(token);
        if (!token) {
           return res.status(409).json({
            message : "unauthorized request user not login"
           })
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    
        const user = await User.findById(decodedToken?.userId).select("-password ")
    
        if (!user) {
            
            return res.status(409).json({
            message : "unauthorized user"
           })
        }
        req.user = user;
        next()
    } catch (error) {
        return res.status(409).json({
            message : "unauthorized request"
        })
    }
}