import { Transaction } from "../models/transaction.model.js";



export const getAllTransaction = async(req,res) =>{
    const user = req.user

    const transactions = await Transaction.find({user})
    try {
        res.status(200).json({transactions})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


export const createTransaction = async(req,res) =>{
    const user = req.body.user;
    console.log(user);
    const {category, amount, comment} = req.body
    console.log(category, amount, comment);
    try{
        if(!category || !amount){
            res.status(400).json({message : "all fields are required"})
        }
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
    const transaction = await Transaction.create({
        user,
        category,
        amount,
        comment
    })
    if(!transaction){
        res.status(400).json({message : "transaction not created"})
    }
    try {
        res.status(200).json({transaction})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


export const updateTransaction = async(req,res) => {
    const user = req.user;
    if(!user){
        res.status(404).json({message : "user not found"})
    }

    const {id} = req.params
    const {category, amount, comments} = req.body
    try {
        if(!category || !amount){
            res.status(400).json({message : "all fields are required"})
        }
    } catch (error) {
        res.status(500).json({message : error.message})
    }

    const transaction = await Transaction.findByIdAndUpdate(id, {
        category,
        amount,
        comments
    }, {new : true})
    if(!transaction){
        res.status(404).json({message : "transaction not found"})   
    }
    try {
        res.status(200).json({transaction})
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
}   

export const deleteTransaction = async(req,res) => {
    const user = req.user;
    if(!user){
        res.status(404).json({message : "user not found"})
    }
    const {id} = req.params
    try {
        const transaction = await Transaction.findByIdAndDelete(id)
        if(!transaction){
            res.status(404).json({message : "transaction not found"})   
        }
        res.status(200).json({message : "transaction deleted successfully"})
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}