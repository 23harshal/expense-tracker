import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ExpenseForm = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState();
  const [comment, setComment] = useState("");
  const { addExpense } = useAuth();
  const { currentUser } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(category, amount, comment);
    const user = currentUser.user
    
    try {
      const response = await axios.post(
        "http://localhost:8000/api/expense/create-transaction",
        {
          category,
          amount,
          comment,
          user
          
        }
      );
      if(response.status === 200){
        navigate("/view-expense")
      }
      // Handle successful response (e.g., redirect, update state)
    } catch (error) {
      console.error("Error creating transaction:", error);
      // Handle errors gracefully (e.g., display error message)
    }
    addExpense({ category, amount, comment });

    setCategory("");
    setAmount();
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        <option value="food">Food</option>
        <option value="transportation">Transportation</option>
        <option value="bills">Bills</option>
        <option value="entertainment">Entertainment</option>
        {/* Add more category options as needed */}
      </select>
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <label htmlFor="comment">Comment (optional):</label>
      <textarea
        id="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="px-3 py-2 border rounded-md h-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
