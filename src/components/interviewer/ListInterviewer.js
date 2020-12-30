import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuid } from 'uuid';

import interviewerContext from '../../context/interviewers/interviewer-context';

const ListInterviewer = () => {

  const interviewersContext = useContext(interviewerContext);
  const { interviewers, selectedInterviewer, getInterviewers, addInterviewer, selectInterviewer } = interviewersContext;

  useEffect(() => {
    getInterviewers();
    // eslint-disable-next-line
  }, []);

  // const interviewers = [1,2];
  const initInterviewer = {
    id: '',
    name: '',
    idEmployee: '',
    enterpriseid: ''
  }
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [newInterviewer, setnewInterviewer] = useState(initInterviewer);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleClickNav = (e) => {
    e.preventDefault();
    history.push('/candidato');
  }

  const onChangeProject = e => {
    setnewInterviewer({
      ...newInterviewer,
      [e.target.name]: e.target.value
    });
  }

  const addId = () => {
    newInterviewer.id = uuid();
    addInterviewer(newInterviewer);

    handleClose();
    setnewInterviewer(initInterviewer);
  }

  return (
    <div className="list-interviewrs">
      <h3>Entrevistadores</h3>
      { interviewers.length > 0 ?
        (
          <div className="cont-list">
            {interviewers.map(interviewer => (
              <Col
                className = { selectedInterviewer ? selectedInterviewer.id===interviewer.id ? 'card-user border-selected': 'card-user': 'card-user'}
                sm="6" xs="12" md="3" lg="2"
                key={interviewer.id}
                onClick={() => { selectInterviewer(interviewer) }}
              >
                <span>
                  <FontAwesomeIcon className="ico-user" icon="user" />
                </span>
                <span className="card-name">{interviewer.name}</span>
                <span>{interviewer.idEmployee}</span>
                <span>{interviewer.enterpriseid}</span>
              </Col>
            ))}
            <Col className="buttton-to-add" sm="6" xs="12" md="3" lg="2" onClick={handleShow}>
              <span><FontAwesomeIcon className="ico-user" icon="user-plus" /></span>
              <p>Haz click aquí para añadir otro entrevistador</p>
            </Col>
          </div>
        )
        :
        (
          <div className="interviewer-empty">
            <h4>No se ha registrado ningún entrevistador</h4>
            <div onClick={handleShow} className="cursor-pointer">
              <FontAwesomeIcon className="ico-user" icon="user-plus" />
              <p>Haga click aquí para añadir</p>
            </div>
          </div>
        )
      }

      <div className="mt-2 d-flex flex-row-reverse">
        <Button
          variant={selectedInterviewer ? 'primary' : 'secondary'}
          disabled={selectedInterviewer ? false : true}
          onClick={handleClickNav}
        >Continuar</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <FontAwesomeIcon className="ico-user" icon="user-plus" /> Nuevo entrevistador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el nombre" name='name' value={newInterviewer.name} onChange={onChangeProject} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>ID del empleado</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el id del empleado" name='idEmployee' value={newInterviewer.idEmployee} onChange={onChangeProject} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>EID</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el eid" name='enterpriseid' value={newInterviewer.enterpriseid} onChange={onChangeProject} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addId}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListInterviewer;