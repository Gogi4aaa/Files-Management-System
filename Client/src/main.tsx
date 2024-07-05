import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard.tsx'
import LoginRegister from './Pages/LoginRegister/LoginRegister.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/login-register",
    element: <LoginRegister/>
  },
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
