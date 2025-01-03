import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import uploadImg from '../assets/uploadImg.webp';
import { addProjectAPI } from '../services/allApi';
import { addProjectResponseContext } from '../contexts/ContextApi';

const Add = () => {
    const { addProjectResponse,setAddProjectResponse }= useContext( addProjectResponseContext)
    const [preview, setPreview] = useState("");
    const [imageFileStatus, setImageFileStatus] = useState(false);
    const [loading, setLoading] = useState(false);

    const [projectDetails, setProjectDetail] = useState({
        title: "",
        languages: "",
        overview: "",
        github: "",
        website: "",
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

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPreview("");
        setImageFileStatus(false);
        setProjectDetail({
            title: "",
            languages: "",
            overview: "",
            github: "",
            website: "",
            projectImg: ""
        });
    };

    const handleShow = () => setShow(true);

    const handleAddProject = async () => {
        const { title, languages, overview, github, website, projectImg } = projectDetails;

        if (title && languages && overview && github && website && projectImg) {
            const reqBody = new FormData();
            reqBody.append("title", title);
            reqBody.append("languages", languages);
            reqBody.append("overview", overview);
            reqBody.append("github", github);
            reqBody.append("website", website);
            reqBody.append("projectImg",  projectImg);

            const token = sessionStorage.getItem("token");
            if (token) {
                const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    "Authorization": `Bearer ${token}`
                };

                try {
                    setLoading(true); // Disable button and show loader
                    const result = await addProjectAPI(reqBody, reqHeader);
                    if (result.status === 200) {
                        alert("Project added successfully!");
                        setAddProjectResponse(result)
                        handleClose();
                    } else {
                        alert(result.response.data || "An error occurred.");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Failed to add the project. Please try again.");
                } finally {
                    setLoading(false); // Re-enable button
                }
            }
        } else {
            alert("Please fill the form completely!!!");
        }
    };

    return (
        <>
            <button onClick={handleShow} className="btn btn-primary">
                + New Project
            </button>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>New Project Details!!!</Modal.Title>
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
                                    src={preview ? preview : uploadImg}
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
                    <Button variant="secondary" onClick={handleClose} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleAddProject} variant="primary" disabled={loading}>
                        {loading ? "Adding..." : "Add"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Add;
