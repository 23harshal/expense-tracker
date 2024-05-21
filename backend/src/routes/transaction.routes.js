import express from "express"
import { verifyToken } from "../middelwares/verifyToken.js"

import { getAllTransaction ,
    createTransaction ,
    updateTransaction,
    deleteTransaction
 } from "../controller/transaction.controller.js";


const route = express.Router();


route.get("/",getAllTransaction)
route.post("/create-transaction" , createTransaction)
route.put("/update-transaction/:id", verifyToken , updateTransaction)
route.delete("/delete-transaction/:id", verifyToken , deleteTransaction)


export default route;