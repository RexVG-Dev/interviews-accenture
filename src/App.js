import React from 'react';
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


function App() {

  return (
    <InterviewerState>
      <div className="cont-main">
        <Router>
          <Header />
          <div className="cont-switch">
            <Switch>
              <Route exact path="/" component={ListInterviewer} />
              <CandidateState>
                <Route exact path="/candidato" component={Candidate} />
                <Route exact path="/entrevista" component={Interview}/>
                <Route exact path="/resumen" component={ResumeInterview}/>
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
