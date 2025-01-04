import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { getHomeProjectAPI } from '../services/allApi';

const Home = () => {
  const [allHomeProjects, setAllHomeProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllHomeProjects();
  }, []);

  const getAllHomeProjects = async () => {
    try {
      const result = await getHomeProjectAPI();
      if (result.status === 200) {
        setAllHomeProjects(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProjects = () => {
    if (sessionStorage.getItem('token')) {
      navigate('/projects');
    } else {
      alert('Please login to get full access to our projects!');
    }
  };

  return (
    <>
      <div
        style={{ minHeight: '100vh' }}
        className="d-flex justify-content-center align-items-center rounded shadow w-100"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: '80px' }}>
                <i className="fa-brands fs-docker"></i> ProjectFair
              </h1>
              <p style={{ fontSize: '30px' }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              {sessionStorage.getItem('token') ? (
                <Link to={'/dashboard'} className="btn btn-warning">
                  MANAGE YOUR PROJECTS
                </Link>
              ) : (
                <Link to={'/login'} className="btn btn-warning">
                  START TO EXPLORE
                </Link>
              )}
            </div>
            <div className="col-lg-6">
              {/* Updated the image source path */}
              <img className="img-fluid" src="/src/assets/landingImg.webp" alt="landing" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <h1 className="mb-5">Explore Our Projects</h1>
        <marquee>
          <div className="d-flex">
            {allHomeProjects?.map((project) => (
              <div key={project?._id} className="me-5">
                <ProjectCard displayData={project} />
              </div>
            ))}
          </div>
        </marquee>
        <button onClick={handleProjects} className="btn btn-link mt-5">
          CLICK HERE TO VIEW MORE PROJECTS...
        </button>
      </div>

      <div className="d-flex justify-content-center align-items-center mt-5 flex-column">
        <h1>Our Testimonials</h1>
        <div className="d-flex align-items-center justify-content-evenly mt-3 w-100">
          <Card style={{ width: '18rem' }} className="me-3 mb-3">
            <Card.Body>
              <Card.Title className="d-flex align-items-center justify-content-center mt-5 flex-column">
                <img
                  width={'600px'}
                  height={'600px'}
                  className="rounded-circle img-fluid"
                  src="https://cdn.imgbin.com/1/21/9/imgbin-business-digital-marketing-testimonial-business-avatar-zaQ0KGwkNuwHXe7LrW4mBSmri.jpg"
                  alt=""
                />
                <span>Max Miller</span>
              </Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-center">
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                  <i className="fa-solid fa-star text-warning"></i>
                </div>
                <p style={{ textAlign: 'justify' }}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Repeat for additional testimonials */}
        </div>
      </div>
    </>
  );
};

export default Home;
