
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import { useContext, useEffect } from 'react'
import { tokenAuthContext } from './contexts/AuthContextApi';
import Pnf from './components/Pnf'


function App() {
 const {isAutherised,setIsAutherised}=useContext(tokenAuthContext)
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsAutherised(true)
    }else{
      setIsAutherised(false)
    }
  },[isAutherised])
  console.log(isAutherised);
  return (
    <>
   
    <Routes>
       <Route path='/'element={<Home/>}/>
      {
        isAutherised &&
        <>
        <Route path='/dashboard'element={<Dashboard/>}/>
        <Route path='/projects'element={<Projects/>}/>
      </>
      }
      {/*  <Route path='/dashboard'element={isAutherised?<Dashboard/>:<Navigate to={'/login'}/>}/> */}
{/*        <Route path='/projects'element={isAutherised?<Projects/>:<Navigate to={'/login'}/>}/> */}
       <Route path='/login'element={<Auth/>}/>
       <Route path='/Register'element={<Auth insideRegister={true}/>}/>
       <Route path='/*'element={<Pnf/>}/>
        </Routes>
        <Footer/>
    </>
  )
}

export default App
