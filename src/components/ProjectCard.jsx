import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../services/serverUrl';

const ProjectCard = ({ displayData }) => {
  const [show, setShow] = useState(false);

  // Handlers for Modal visibility
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      {/* Project Card */}
      <Card style={{ width: '18rem' }} onClick={handleShow}>
        <Card.Img
          variant="top"
          src={`${SERVER_URL}/uploads/${displayData?.projectImg}`}alt=""/>
        <Card.Body>
          <Card.Title>{displayData?.title}</Card.Title>
          <Card.Text>
            {displayData?.overview || 'No description available'}
          </Card.Text>
         
        
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
<div className='row align-items-center'>
  <div className='col-lg-6'>
    <img className='img-fluid'src={`${SERVER_URL}/uploads/${displayData?.projectImg}`}alt=""/>
  </div>

  <div className='col-lg-6'>
    <h3>{displayData?.title}</h3>
    <h6 className='fw-bolder'>Language Used:<span className='text-danger'>{displayData?.languages}</span></h6>
    <p style={{ textAlign:'justify' }}><span className='fw-bolder'>{displayData?.overview}:</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita enim veritatis beatae alias, est maiores. Accusamus magnam repudiandae, quod fugiat vitae facere cupiditate, ea hic aperiam incidunt, dolores fugit maiores?</p>
  </div>
</div>

<div className='mt-2 float-right '>
  <a href={displayData?.github}className='btn btn-secondary'target='_blank'><i className='fa-brands fa-github'></i></a>
  <a href={displayData?.website}className='btn btn-secondary ms-2'target='_blank'><i className='fa-solid fa-link'></i></a>

</div>


        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectCard;
