import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { Col, Row } from 'react-bootstrap';
import { allProjectAPI } from '../services/allApi';

const Projects = () => {
  const [searchKey,setSearchKey]=useState("")
  const [allProjects, setAllProjects] = useState([]);
  console.log(allProjects);

  useEffect(() => {
    getAllProjects();
  }, [searchKey]);

  const getAllProjects = async () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
      "Authorization": `Bearer ${token}`
      }
      try {
        const result = await allProjectAPI(searchKey,reqHeader);
        if (result.status === 200) {
          setAllProjects(result.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div style={{ paddingTop: '100px' }} className="container-fluid">
        <div className="d-flex justify-content-between">
          <h1>All Projects</h1>
          <input onChange={e=>setSearchKey(e.target.value)}
            placeholder="search projects by their languages"
            type="text"
            className="form-control w-25"
          />
        </div>

        <Row className="mt-3">
          {allProjects?.length>0?
          allProjects?.map(project => (
            <Col key={project?._id}
           className='mb-3'
           sm={12} md={6} lg={4}>
              <ProjectCard displayData={project} />
            </Col>
          ))
        :
        <div className='text-danger fw-bolder'>
        Project Not found!!!</div>
        }
        </Row>
      </div>
    </>
  );
};

export default Projects;
