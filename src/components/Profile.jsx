import React, { useEffect, useState } from 'react';
import ProfileImage from '../assets/Profile.png';
import Collapse from 'react-bootstrap/Collapse';
import SERVER_URL from '../services/serverUrl';
import { updateUserAPI } from '../services/allApi';

const Profile = () => {
  const [ preview,setPreview] = useState("")
  const [existingProfileImg,setExistingProfileImg] = useState("")
  const [userDetails,setUserDetails] = useState({
    
username:"",
email:"",

password:"",

github:"",

linkedin:"",

profile:""


  })
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
      const user =JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({
        ...userDetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin
      })
      setExistingProfileImg(user.profile)

    }
  },[open])

  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile));
    } else {
      setPreview("");
    }
  }, [userDetails.profile]);
  
  const handleUpdateProfile = async () => {
    const { username, email, password, github, linkedin, profile } = userDetails;
  
    if (linkedin && github) {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("github", github);
      reqBody.append("linkedin", linkedin);
      preview
        ? reqBody.append("profile", profile)
        : reqBody.append("profile", existingProfileImg);
  
      const token = sessionStorage.getItem("token");
  
      if (token) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
  
        try {
          const result = await updateUserAPI(reqBody, reqHeader);
  
          if (result.status === 200) {
            alert("User profile updated successfully");
            sessionStorage.setItem("user", JSON.stringify(result.data));
            setOpen(!open); // Assuming `open` is a state variable
          } else {
            console.log(result);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Authorization token is missing");
      }
    } else {
      alert("Please fill the form completely");
    }
  };
  
  

  return (
    <>
      <div className='d-flex justify-content-evenly'>
        <h3 className='text-warning'>Profile</h3>
        <button 
          onClick={() => setOpen(!open)}
          className='btn text-warning'>
          <i className='fa-solid fa-chevron-down'></i>
        </button>
      </div>
      <Collapse in={open}>
        <div className='row container-fluid align-items-center justify-content-center shadow p-2 rounded' id="example-collapse-text">
          <label className='text-center'>
            <input onChange={e=>setUserDetails({...userDetails,profile:e.target.files[0]})}type='file' style={{ display: 'none' }} />
            {
              existingProfileImg=="" ?
              <img width={'200px'} height={'200px' }className='rounded-circle' src={preview?preview:ProfileImage} alt="Profile" />
          :
          <img width={'200px'} height={'200px' }className='rounded-circle' src={preview?preview:`${SERVER_URL}/uploads/${existingProfileImg}`} alt="Profile" />
          
            }
            </label>

          <div className='mb-2 w-100'>
            <input value={userDetails.github}onChange={e=>setUserDetails({...userDetails,github:e.target.value})}placeholder='user github link'type="text"className='form-control'/>
          </div>

          <div className='mb-2 w-100'>
            <input value={userDetails.linkedin}onChange={e=>setUserDetails({...userDetails,linkedin:e.target.value})}placeholder='user linkedin profile link'type="text"className='form-control'/>
          </div>

          <div className='d-grid w-100'>
            <button onClick={handleUpdateProfile}className='btn btn-warning'>Update Profile</button>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default Profile;
