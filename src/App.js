import React, { useState } from 'react';
import './components/FontAwesomeIcons';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ListInterviewer from './components/interviewer/ListInterviewer';
import Candidate from './components/candidate/Candidate';
import Interview from './components/interview/Interview';
import ResumeInterview from './components/candidate/Resume-Interview';

import InterviewerState from './context/interviewers/interviewer-state';
import CandidateState from './context/candidate/candidate-state';

import Alert from 'react-bootstrap/Alert';


function App() {

  const [showAlert, setShowAlert] = useState(false);
  const [variantAlert, setVariantAlert] = useState('success');
  const [messageAlert, setMessageAlert] = useState('Mensaje de Alerta');

  const turnAlert = (typeAlert, msg) => {
    setVariantAlert(typeAlert);
    setMessageAlert(msg);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);

  }

  return (
    <InterviewerState>
      <div className="cont-main">
        <Router>
          <Header />
          
          <div className="cont-switch">
            <Alert className="text-center" show={showAlert} variant={variantAlert} onClose={true}>
              <p>{messageAlert}</p>
            </Alert>

            <Switch>
              
              <Route exact path="/" render={() => <ListInterviewer turnAlert={turnAlert}/>}/>
              <CandidateState>
                <Route exact path="/candidato" render={() => <Candidate turnAlert={turnAlert}/>}/>
                <Route exact path="/entrevista" render={() => <Interview turnAlert={turnAlert}/>}/>
                <Route exact path="/resumen" render={() => <ResumeInterview turnAlert={turnAlert}/>}/>
              </CandidateState>
            </Switch>
          </div>

          <Footer />
        </Router>
      </div>
    </InterviewerState>

  );
}

export default App;
