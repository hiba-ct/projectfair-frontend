import React, { createContext, useEffect, useState } from 'react'

export const tokenAuthContext =createContext()


const AuthContextApi = ({children  }) => {
     const [isAutherised,setIsAutherised]=useState(false)
     useEffect(()=>{
        if(sessionStorage.getItem("token")){
            setIsAutherised(true)
        }else{
            setIsAutherised(false)
        }
     },[isAutherised])
  return (
   <tokenAuthContext.Provider value={{ isAutherised,setIsAutherised }}>
    {children}
   </tokenAuthContext.Provider>
  )
}

export default AuthContextApi