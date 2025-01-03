import { faFacebook, faInstagram, faLinkedinIn, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'

import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className='row  p-5 flex bg-yellow-500 text-white p-5 mt-5 rounded shadow  '>
    <div className="col-md-4" >
    <h5 className='text-white'>  <i className='fa-brands fa-docker me-2'></i>
  
   ProjectFair
   </h5>


   <p >Enjoy an immersive media experience with our player, 
            built to offer seamless streaming, easy navigation, 
            and high-quality playback. Whether you're listening 
            to music or watching videos, we are committed to 
            providing you with the best user experience. Stay tuned 
            for regular updates and new features, designed to enhance your media journey. 







</p>
                 </div> 
            <div className="col-md-2  d-md-flex justify-content-center" >
             <div>
              <h4 className='mb-4'>Links</h4>
              <div>
             <Link style={{ textDecoration:'none',color:'white' }}to={'/'}> <p>Home</p></Link>
        
              <Link style={{ textDecoration:'none',color:'white' }}to={'/login'}><p>Login</p></Link>
              <Link style={{ textDecoration:'none',color:'white' }}to={'/register'}><p>Register</p></Link>
          </div>
            </div>
              </div>
            <div className='col-md-1'></div>
            <div className="col-md-2" >
            <div>
              <h4 className='mb-4'>Guides</h4>
              <div>
              <p>React</p>
              <p>React Bootstrap</p>
              <p>Routing</p>
            </div>
            </div>
            </div>
            <div className="col-md-3 d-md-flex justify-content-center" >
                <div>
              <h4>Contact us</h4>
              <div className='d-flex mt-4'>
                <input type='text'className='form-control'placeholder=' enter your Email Id'/>
                <button className='btn btn-primary ms-4'>→</button>
              </div>
              <div className='icons fs-5 d-flex justify-content-between mt-3'>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className='fa-solid fa-envelope'></i></Link>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-youtube" /></Link>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-whatsapp" /></Link>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-twitter" /></Link>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-instagram" /></Link>

<Link to={'https://getbootstrap.com/'}style={{ textDecoration:'none',color:'white' }}>
<i className="fa-brands fa-facebook" /></Link>
              </div>
            </div>

   </div>
   <p className='p-3 d-flex justify-content-center '>Copyright © 2024 Project Fair.Built with React</p>
   </div>
   </>
  )
}

export default Footer