import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const addExpense = (newExpense) => {
   

    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = async (expenseId) => {
    try {
      await axios.delete(`/api/expenses/${expenseId}`);
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const editExpense = async (updatedExpense) => {
    try {
      const response = await axios.put(`/api/expenses/${updatedExpense._id}`, updatedExpense);
      const updatedExpenses = expenses.map((expense) =>
        expense._id === updatedExpense._id ? response.data : expense
      );
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error('Error editing expense:', error);
    }
  };

  const login = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true)
    fetchExpenses();
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false)
    setExpenses([]);
  };

//   useEffect(() => {
//     if (currentUser) {
//       fetchExpenses();
//     }
//   }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        expenses,
        addExpense,
        deleteExpense,
        editExpense,
        login,
        logout,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);