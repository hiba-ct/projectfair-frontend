import React, { useContext, useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'  // Update to react-bootstrap

import SERVER_URL from '../services/serverUrl';
import { updateProjectAPI } from '../services/allApi';

import { editProjectResponseContext } from '../contexts/ContextApi';



const Edit = ({project}) => {

      const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
      const [preview, setPreview] = useState("");
      const [imageFileStatus, setImageFileStatus] = useState(false);
      const [loading, setLoading] = useState(false);
  
      const [projectDetails, setProjectDetail] = useState({
          id:project._id,
          title: project.title,
          languages: project.languages,
          overview: project.overview,
          github: project.github,
          website: project.website,
          projectImg: ""
      });
  
      console.log(projectDetails);


       useEffect(() => {
              if (
                  projectDetails.projectImg &&
                  ["image/png", "image/jpg", "image/jpeg"].includes(projectDetails.projectImg.type)
              ) {
                  setImageFileStatus(true);
                  setPreview(URL.createObjectURL(projectDetails.projectImg));
              } else {
                  setImageFileStatus(false);
                  setPreview("");
                  setProjectDetail({ ...projectDetails, projectImg: "" });
              }
          }, [projectDetails.projectImg]);


  const [show,setShow] = useState(false);
  const handleClose = () =>{

     setShow(false);
    setProjectDetail({
      id:project._id,
      title: project.title,
      languages: project.languages,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImg: ""
  })
}
  const handleShow = () => {
    setShow(true);
    setProjectDetail({
      id:project._id,
      title: project.title,
      languages: project.languages,
      overview: project.overview,
      github: project.github,
      website: project.website,
      projectImg: ""
  })
  }

  const handleUpdateProject = async()=>{
const {id,title,languages,overview,github,website,projectImg}=projectDetails
if(title && languages && overview && github && website){
//api call-put(id,update-Details)
const reqBody = new FormData();
reqBody.append("title", title);
reqBody.append("languages", languages);
reqBody.append("overview", overview);
reqBody.append("github", github);
reqBody.append("website", website);
preview? reqBody.append("projectImg",  projectImg):reqBody.append("projectImg",project.projectImg)

const token = sessionStorage.getItem("token");

  if (token) {
    
  //api call
    const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`
    };
    try{
      const result = await updateProjectAPI(id,reqBody,reqHeader)
    if(result.status==200){
alert("project updated successfully!!!")
handleClose()
setEditProjectResponse(result)
    }
    }catch(err){
      console.log(err)
    }
  }

}else{
  alert("please fill the form comletely!!!")
}
  }
  return (
   <>
<button onClick={handleShow} className='btn '><i className='fa-solid fa-edit'></i></button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Project Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <div className="row align-items-center">
                                  <div className="col-lg-4">
                                      <label>
                                          <input
                                              onChange={(e) =>
                                                  setProjectDetail({
                                                      ...projectDetails,
                                                      projectImg: e.target.files[0]
                                                  })
                                              }
                                              type="file"
                                              style={{ display: "none" }}
                                          />
                                          <img
                                              height={"200px"}
                                              className="img-fluid"
                                              src={preview ? preview : `${SERVER_URL}/uploads/${project.projectImg}`}
                                              alt=""
                                          />
                                      </label>
                                      {!imageFileStatus && (
                                          <div className="text-warning fw-bolder my-2">
                                              Upload only the following file types (jpeg, jpg, png) here!!!
                                          </div>
                                      )}
                                  </div>
                                  <div className="col-lg-8">
                                      <div className="mb-2">
                                          <input
                                              value={projectDetails.title}
                                              onChange={(e) =>
                                                  setProjectDetail({ ...projectDetails, title: e.target.value })
                                              }
                                              placeholder="Project Title"
                                              type="text"
                                              className="form-control"
                                          />
                                      </div>
          
                                      <div className="mb-2">
                                          <input
                                              value={projectDetails.languages}
                                              onChange={(e) =>
                                                  setProjectDetail({ ...projectDetails, languages: e.target.value })
                                              }
                                              placeholder="Languages used in project"
                                              type="text"
                                              className="form-control"
                                          />
                                      </div>
          
                                      <div className="mb-2">
                                          <input
                                              value={projectDetails.overview}
                                              onChange={(e) =>
                                                  setProjectDetail({ ...projectDetails, overview: e.target.value })
                                              }
                                              placeholder="Project Overview"
                                              type="text"
                                              className="form-control"
                                          />
                                      </div>
          
                                      <div className="mb-2">
                                          <input
                                              value={projectDetails.github}
                                              onChange={(e) =>
                                                  setProjectDetail({ ...projectDetails, github: e.target.value })
                                              }
                                              placeholder="Project Github Link"
                                              type="text"
                                              className="form-control"
                                          />
                                      </div>
          
                                      <div className="mb-2">
                                          <input
                                              value={projectDetails.website}
                                              onChange={(e) =>
                                                  setProjectDetail({ ...projectDetails, website: e.target.value })
                                              }
                                              placeholder="Project Website Link"
                                              type="text"
                                              className="form-control"
                                          />
                                      </div>
                                  </div>
                              </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdateProject} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
 




  )
}

export default Edit