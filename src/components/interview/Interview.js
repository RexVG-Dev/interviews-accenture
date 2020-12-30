import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Col, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel'

import candidateContext from '../../context/candidate/candidate-context';
import interviewerContext from '../../context/interviewers/interviewer-context';

const Interview = () => {

  const history = useHistory();

  const interviewersContext = useContext(interviewerContext);
  const { selectedInterviewer } = interviewersContext;

  const candidatesContext = useContext(candidateContext);
  const { candidate, listQuestions, getQuestions, sendQuestions} = candidatesContext;

  useEffect(() => {
    if (!candidate.id || !selectedInterviewer.id) {
      history.push('/');
    }

    if (candidate.evaluated) {
      history.push('/resumen');
    }
  });

  useEffect(() => {
    if (listQuestions.length === 0) {
      // eslint-disable-next-line
      candidate.skills.map(skill => {
        getQuestions(skill.id);
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleResponse = e => {
    const values = e.target.value.split(',');
    const idQuestion = values[0];
    const value = values[1]==='true' ? true: false;
    // eslint-disable-next-line
    listQuestions.map(question => {
      if(question.id === idQuestion) {
        question.response = value;
      }
    });
  }

  const handleComment = e => {
    const value = e.target.value;
    const values = e.target.name.split(',');
    const idQuestion = values[0];
    // const type = values[1];
    // eslint-disable-next-line
    listQuestions.map( question => {
      if(question.id === idQuestion) {
        question.comments = value;
      }
    });

  }

  const submitInterview = () => {
    let checkQuestions = true;
    // eslint-disable-next-line
    listQuestions.map(question => {
      if ( question.response === '') {
        checkQuestions = false;
      }
    });

    if (!checkQuestions) return;

    sendQuestions(listQuestions);

  }

  return (
    <div className='height-100'>
      <h3 className="ml-3">Preguntas</h3>
      <Carousel interval={null} className='Carousel' indicators={null}>
        {listQuestions.map((question, index) => (
          <Carousel.Item className='Carousel-Item' key={question.id}>
            <Carousel.Caption className='Carousel-Caption'>
              <Form className="Form-Question">
                <span className="title-question">{question.nameSkill}</span>
                <Form.Group onChange={handleResponse}
                  controlId="formGroupQuestion" className="my-4 d-flex flex-column justify-content-center align-items-center">
                  <Form.Label className="descp-question">{question.question}</Form.Label>
                  <Row>
                    <Col sm={12} md={6}>
                      <Form.Check
                        inline
                        type="radio"
                        label="Correcto"
                        value={[question.id,true]}
                        name="response"
                      />
                    </Col>
                    <Col sm={12} md={6}>
                      <Form.Check
                        inline
                        type="radio"
                        label="Incorrecto"
                        value={[question.id,false]}
                        name="response"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId="formGroupComments" className="p-3">
                  <Form.Label>Comentarios:</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={3}
                    name={[question.id, 'comments']}
                    onChange={handleComment} />
                </Form.Group>
                <p className="footer-slide"><span className="current-slide">{index + 1}</span><span className="total-slide">/{listQuestions.length}</span></p>

                <div className="d-flex flex-row-reverse pr-3">
                  <Button
                    onClick={submitInterview}
                    variant= { (index+1) === listQuestions.length ? 'primary': 'secondary'}
                    disabled = { (index+1) === listQuestions.length ? false: true }
                  >Finalizar</Button>
                </div>
              </Form>
            </Carousel.Caption>
          </Carousel.Item>
        ))}

      </Carousel>
      {/* <div className="d-flex flex-row-reverse pr-3 mb-3">
        <Button variant="primary">Finalizar</Button>
      </div> */}
    </div>
  );
}

export default Interview;