import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import PrivateRoute from './components/PrivateRoute'
import ExpenseForm from './components/ExpenseForm'
import SignupForm from './components/SignUpForm'
import ViewExpense from './components/VIewExpense'
const App = () => {
  return (
    <div className='w-10/12 h-screen mx-auto'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element = {<LoginForm />} />
            <Route path='/signup' element = {<SignupForm />} />
            <Route path='/expense-form' element = {<ExpenseForm />} />
            <Route path='/view-expense' element = {<ViewExpense />} />
            {/* <Route
                    path='/'
                    element={
                        <PrivateRoute>
                           <ExpenseForm />
                        </PrivateRoute>
                    }
                /> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App