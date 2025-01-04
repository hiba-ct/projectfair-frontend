import React, { useContext, useEffect, useState } from 'react';
import View from '../components/View';
import Header from '../components/Header';
import Profile from '../components/Profile';
import { tokenAuthContext } from '../contexts/AuthContextApi';

const Dashboard = () => {
  const {iAutherised,setIsAutherised}=useContext(tokenAuthContext)
  const [username, setUsername] = useState("");

  useEffect(() => {
    
    const userData = sessionStorage.getItem("existingUser");
    if (userData) {
      const parsedUser = JSON.parse(userData); // Parse the JSON data once retrieved
      setUsername(parsedUser.username.split(" ")[0]); // Access the `username` directly from parsed object
    } else {
      setUsername("");
    }
  }, []);

  return (
    <>
      <Header insideDashboard={true}/> 
      <div style={{ paddingTop: '100px' }} className='container-fluid'>
        <div className='row mt-3'>
          <div className='col-lg-8'>
            <h1>Welcome <span className='text-warning'>{username},</span></h1>
            <View/>
          </div>
          <div className='col-lg-4'>
            <Profile/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
