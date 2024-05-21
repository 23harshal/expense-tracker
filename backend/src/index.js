import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParse from "cookie-parser";
import bodyParser from "body-parser";
import userRoute from "./routes/user.route.js"
import expenseRoute from "./routes/transaction.routes.js"

// fv1uf2tUZIxXdRIF
const url = "mongodb+srv://admin:fv1uf2tUZIxXdRIF@expense-tracker.7jwtgbb.mongodb.net/?retryWrites=true&w=majority&appName=expense-tracker";

const app = express();


// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(cookieParse());

mongoose
  .connect(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));




app.use("/api/auth", userRoute);
app.use("/api/expense", expenseRoute)

app.listen(8000, () => {
  console.log("server started on localhost 8000");
});
