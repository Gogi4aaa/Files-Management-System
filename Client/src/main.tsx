import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/Dashboard.tsx'
import LoginRegister from './Pages/LoginRegister/LoginRegister.tsx'
import Files from './Pages/Files/Files.tsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Files />
  },
  {
    path: "/dashboard",
    element: <Dashboard/>
  },
  {
    path: "/login-register",
    element: <LoginRegister/>
  },
  {
    path: "/files",
    element: <Files />
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
