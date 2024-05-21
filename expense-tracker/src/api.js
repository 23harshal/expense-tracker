// api.js
const BASE_URL = 'http://localhost:8000'; // Update with your backend URL

export const signUp = async (userData) => {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (userData) => {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const addExpense = async (expenseData, token) => {
  const response = await fetch(`${BASE_URL}/api/transactions/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });
  return response.json();
};

export const getExpenses = async (token) => {
  const response = await fetch(`${BASE_URL}/api/transactions/view`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const editExpense = async (expenseId, expenseData, token) => {
  const response = await fetch(`${BASE_URL}/api/transactions/edit/${expenseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });
  return response.json();
};

export const deleteExpense = async (expenseId, token) => {
  const response = await fetch(`${BASE_URL}/api/transactions/delete/${expenseId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};