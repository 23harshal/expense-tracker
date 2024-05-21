import { User } from "../models/user.model.js";
import bcryptjs from "bcrypt"
import jwt from "jsonwebtoken"


export const registerUser = async(req, res) => {

	const {username, email, password} = req.body;
	// console.log(username, email, password);
	if (
        [ email, username, password].some((field) => field?.trim() === "")
    ) {
       return res.status(400).json({message : "all fields are required"})
    }

	const existedUser = await User.findOne({
		$or:[{username}, {email}]
	})

	 const hashedPassword = bcryptjs.hashSync(password, 10)

	if(existedUser){
		return res.status(409).message({message : "user with email or username already exits"})
	}



	const user = await User.create({
		username,
		email,
		password: hashedPassword,
	})

	const createdUser = await User.findById(user._id).select("-password -email");

	if(!createdUser){
		return res.status(400).json({message : "user is not created try again"})
	}

	res.status(200).json({
		user : createdUser,
		message : "user register successfully"
	})
}


export const loginUser = async(req, res) => {

	const {username, password} = req.body;
	console.log(username, password);
	try {

		if (
        [ username, password].some((field) => field?.trim() === "")
    ) {
       return res.status(400).json({message : "all fields are required"})
    }


		const user = await User.findOne({username})

		if(!user){
			return res.status(400).json({message : "user not found"})
		}

		const isMatched = await bcryptjs.compare(password, user.password)

		if(!isMatched){
			return res.status(409).json({message : "invalid password"})
		}


		const token = jwt.sign(
			{userId : user._id},
			process.env.JWT_SECRET_KEY,
			{
				expiresIn : "1d"
			}
		)

		res.cookie("access_token", token , {
			httpOnly : true,
			maxAge : 86400000,
		})

		res.status(200).json({
			user : user._id,
			message : "login successfully done"
		})
	}
	catch(error){
		console.log(error)
		res.status(400).json({
			message : "bad request from login"
		})
	}

}