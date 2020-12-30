import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { Button, Modal, Form, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import candidateContext from '../../context/candidate/candidate-context';
import interviewerContext from '../../context/interviewers/interviewer-context';

const Candidate = (props) => {

  const {turnAlert} = props;

  const history = useHistory();

  const interviewersContext = useContext(interviewerContext);
  const { selectedInterviewer } = interviewersContext;

  const candidatesContext = useContext(candidateContext);
  const { candidate, skills, getCandidate, addCandidate, updateCandidate, getSummarySkills } = candidatesContext;

  const initCandidate = {
    idInterviewer: selectedInterviewer.id ? selectedInterviewer.id : '',
    name: '',
    email: '',
    type: '',
    skills: [],
    evaluated: false,
    interview: [],
    comments: ""
  }

  const [newCandidate, setNewCandidate] = useState(initCandidate);
  const [show, setShow] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShowSkills = () => setShowSkills(true);
  const handleCloseSkills = () => setShowSkills(false);

  useEffect(() => {
    
    if (!selectedInterviewer.id) {
      history.push('/');
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getCandidate(selectedInterviewer);
    getSummarySkills();
    // eslint-disable-next-line
  }, []);

  const onChangeProject = e => {
    setNewCandidate({
      ...newCandidate,
      [e.target.name]: e.target.value
    });
  }

  const addId = async () => {
    newCandidate.id = uuid();
    const message = await addCandidate(newCandidate);
    handleClose();
    createAlert(message);
  }

  const updateSkills = async () => {
    let tempCandidate = candidate;
    tempCandidate.skills = await skills.filter(skill => skill.isChecked === true);
    const message = await updateCandidate(tempCandidate);
    createAlert(message);
    handleCloseSkills();
  }

  const handleCheckbox = (e) => {
    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];
      if (skill.id === e.target.id) {
        skill.isChecked = !skill.isChecked;
      }
    }

  }

  const handleClickNav = (navBtn = 'back') => {
    switch (navBtn) {
      case 'back':
        history.push('/');
        break;
      case 'interview':
        history.push('/entrevista');
      // eslint-disable-next-line
      default:
        return;
    }
  }

  const createAlert = ({variant, message}) => {
    turnAlert(variant, message);
  }

  return (
    <div className="container pt-3">
      <h3>Candidato</h3>
      { candidate ?
        <Container>
          <Row>
            <Col
              xs="12" md="6"
              className="mt-3 text-break">
              <div className="p-1 candidate-info">
                <div className="row-cont-info-candidate">
                  <FontAwesomeIcon className="mr-3" icon="user" size="4x"/>
                  <p className="column-cont-info-candidate">
                    <label className="label-info-candidate">Nombre completo</label>
                    <span className="span-info-candidate">{candidate.name}</span>
                  </p>
                </div>
                <div className="column-cont-info-candidate mt-2">
                  <label className="label-info-candidate">Correo electronico</label>
                  <span className="span-info-candidate">{candidate.email}</span>
                </div>
                <div className="column-cont-info-candidate mt-2">
                  <label className="label-info-candidate">Tipo</label>
                  <span className="span-info-candidate">{candidate.type}</span>
                </div>
              </div>

            </Col>
            <Col
              xs="12" md="6"
              className="mt-3"
            >
              <div className="p-1 main-cont-skills border-solid-purple">
                <h3>Skills a evaluar:</h3>
                {candidate.skills.length > 0 ?
                  <div>
                    {candidate.skills.map(skill => (
                      <li className="pl-2" key={skill.id}>{skill.name}</li>
                    ))}
                  </div>
                  :
                  <div className="text-center d-flex flex-column cursor-pointer"
                    onClick={handleShowSkills}>
                    <span>No se han seleccionado skills</span>

                    <FontAwesomeIcon className="ico-no-skills" icon="grip-horizontal" />
                    <p>Haz click aquí para añadir</p>
                  </div>
                }
                { candidate.evaluated ? 
                  <p className="text-center mt-4">
                    Este candidato ya fue evaluado. <br/>
                    Haga click en continuar para ver los resultados
                  </p>
                    : null
                }
              </div>

            </Col>
          </Row>

        </Container>
        :
        <div className="text-center add-candidate">
          <h4> No se ha registrado ningún candidato </h4>
          <div
            onClick={handleShow}
            className=" text-center btn-add-candidate mt-5">
            <FontAwesomeIcon className="ico-user icon-btn-add mb-4" icon="user-plus" />
            <p>Haz click aquí para añadir</p>
          </div>
        </div>
      }
      <div className="my-3 d-flex flex-row justify-content-around">
        <Button variant="danger"
          onClick={() => handleClickNav('back')}
          >
            <FontAwesomeIcon className="mr-2" icon="long-arrow-alt-left" size="lg"/>
            Regresar
        </Button>
        <Button
          variant={candidate ? candidate.skills.length > 0 ? 'primary' : 'secondary' : 'secondary'}
          disabled={candidate ? candidate.skills.length > 0 ? false : true : true}
          onClick={() => handleClickNav('interview')}>
            Continuar
            <FontAwesomeIcon className="ml-2" icon="long-arrow-alt-right" size="lg"/>
          </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <FontAwesomeIcon className="ico-user" icon="user-plus" /> Nuevo entrevistador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formGroupName">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el nombre" name='name' value={newCandidate.name} onChange={onChangeProject} />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="text" placeholder="Ingrese un correo electrónico" name='email' value={newCandidate.email} onChange={onChangeProject} />
            </Form.Group>
            <Form.Group controlId="formGroupType">
              <Form.Label>Tipo</Form.Label>
              <Form.Control as="select" name='type' defaultValue={newCandidate.type ? newCandidate.type : ''} onChange={onChangeProject} >
                <option value='' disabled>Elige el tipo...</option>
                <option value="Interno">Interno</option>
                <option value="Externo">Externo</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addId}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSkills} onHide={handleCloseSkills}>
        <Modal.Header closeButton>
          <Modal.Title> <FontAwesomeIcon className="ico-user" icon="puzzle-piece" /> Skills a evaluar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {skills.map((skill) => (
              <Form.Check
                key={skill.id}
                inline
                type="checkbox"
                id={skill.id}
                label={skill.name}
                className="col-4"
                onChange={handleCheckbox}
                defaultChecked={skill.isChecked}
              />
            ))}
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSkills}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={updateSkills}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Candidate;