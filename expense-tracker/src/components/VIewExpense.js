// ViewExpense.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const ViewExpense = () => {
//   const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);
  const { expenses } = useAuth();
  console.log(expenses);
  const handleDelete = (id) => {
    console.log(`Delete expense with ID: ${id}`);
  };

  const handleEdit = (id) => {
   
    console.log(`Edit expense with ID: ${id}`);
  };

  return (
    <div>
      <h2>Expense List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses != null && expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.category}</td>
              <td>{expense.amount}</td>
              <td>{expense.comment}</td>
              <td>
                <button onClick={() => handleEdit(expense.id)}>Edit</button>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewExpense;