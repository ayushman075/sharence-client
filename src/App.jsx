import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import { AuthProvider } from './context/AuthContext'
import { ConfigProvider } from 'antd'
import { Slide, ToastContainer } from 'react-toastify'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import ProtectedRoute from './component/ProtectedRoute'
import Signup from './page/Signup'
import Home from './page/Home'
import 'react-toastify/dist/ReactToastify.css';
import OAuthCallback from './component/OAuthCallback'

function App() {

  return (
    <>
       <AuthProvider>
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 2,

        colorBgContainer: '#f6ffed',
      },
    }}
  >
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Slide}
/>

<BrowserRouter>
        <Routes>
          <Route>
          <Route path='/login' element={<Login />}/>
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          <Route path='/signup'  element={ <Signup /> }/>
          <Route path='/' element={<ProtectedRoute element={<Home />} />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  </ConfigProvider>
  </AuthProvider>
    </>
  )
}

export default App
