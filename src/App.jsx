
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import { useContext } from 'react'
import { tokenAuthContext } from './contexts/AuthContextApi';


function App() {
 const {isAutherised,setIsAutherised}=useContext(tokenAuthContext)

  return (
    <>
    <Header/>
    <Routes>
       <Route path='/'element={<Home/>}/>
      
       <Route path='/dashboard'element={isAutherised?<Dashboard/>:<Navigate to={'/login'}/>}/>
       <Route path='/projects'element={isAutherised?<Projects/>:<Navigate to={'/login'}/>}/>
       <Route path='/login'element={<Auth/>}/>
       <Route path='/Register'element={<Auth insideRegister={true}/>}/>

        </Routes>
        <Footer/>
    </>
  )
}

export default App
