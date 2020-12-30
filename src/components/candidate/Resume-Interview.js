import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Form, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import candidateContext from '../../context/candidate/candidate-context';

const ResumeInterview = () => {

  const history = useHistory();

  const candidatesContext = useContext(candidateContext);
  const { candidate, updateCandidate} = candidatesContext;

  const [comment, setComment] = useState(candidate.comments);
  const [show, setShow] = useState(false);

  const returnResults = skill => {
    const resultsBySkill = candidate.interview.filter(
      question => question.idSkill === skill.id && question.response);
    return resultsBySkill.length;
  }

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleComment = e => {
    setComment(e.target.value);
  }

  const endInterview = () => {
    let newValCandidate = candidate;
    newValCandidate.comments = comment;
    updateCandidate(newValCandidate);

    history.push('/');
  }

  return (
    <Container>
      <h3>Resumen</h3>
      <Row>
        <Col xs="12" md="6">
          <h4>Datos del candidato</h4>
          <div className="column-cont-info-candidate mt-2">
            <label className="label-info-candidate">Nombre completo</label>
            <span className="span-info-candidate">{candidate.name}</span>
          </div>
          <div className="column-cont-info-candidate mt-2">
            <label className="label-info-candidate">Correo electronico</label>
            <span className="span-info-candidate">{candidate.email}</span>
          </div>
          <div className="column-cont-info-candidate mt-2">
            <label className="label-info-candidate">Tipo</label>
            <span className="span-info-candidate">{candidate.type}</span>
          </div>

        </Col>
        <Col xs="12" md="6" className="mt-3">
          <Row className="row-header-results">
            <Col xs="12" md="6"><h4>Resultados</h4></Col>
            <Col xs="12" md="6">
              <span className="cursor-pointer see-questions"
                onClick={handleShow}
              >Ver Preguntas</span>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="title-table-resume">Skill</Col>
            <Col className="title-table-resume">Puntaje</Col>
          </Row>
          {candidate.skills.map(skill => (
            <Row key={skill.id}>
              <Col>{skill.name}</Col>
              <Col>{returnResults(skill)}</Col>
            </Row>
          ))}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs="12" md="6">
          <Form>
            <Form.Group controlId="formGroupComments">
              <Form.Label><h4>Comentarios:</h4></Form.Label>
              <Form.Control
                as="textarea"
                name="comments"
                rows={5}
                onChange={handleComment}
                defaultValue = {comment}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs="12" md="6" className="d-flex flex-row-reverse">
          <div className="d-flex flex-column-reverse">
            <Button variant="primary" onClick={endInterview}>Finalizar</Button>
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title> <FontAwesomeIcon className="color-purple-1" icon="question-circle" size="lg"/> Preguntas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
          <Row className="header-modal-resume">
            <Col className="boder-solid-black p-2">Pregunta</Col>
            <Col className="boder-solid-black p-2">
              <Row>
                <Col>Respuesta</Col>
                <Col>Comentario</Col>
              </Row>
            </Col>
          </Row>
          { candidate.interview.map(question => (
            <Row key={question.id}>
              <Col className="boder-solid-black p-2">{question.question}</Col>
              <Col className="boder-solid-black p-2">
                <Row>
                  <Col>{question.response ? 'Correcto': 'Incorrecto'}</Col>
                  <Col>{question.comments}</Col>
                </Row>
              </Col>
            </Row>
          ))}
          </Container>
          
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ResumeInterview;