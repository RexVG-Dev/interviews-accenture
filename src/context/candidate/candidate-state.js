import React, { useReducer } from 'react';
import clientAxios from "../../config/axios";

import candidateContext from "./candidate-context";
import candidateReducer from './candidate-reducer';

import {
  GET_CANDIDATE,
  UNSELECT_CANDIDATE,
  ADD_CANDIDATE,
  GET_SKILLS,
  ADD_SKILLS,
  FAIL_SKILLS,
  GET_QUESTIONS,
  SEND_QUESTIONS
} from "../../types";

const CandidateState = props => {
  const initialState = {
    candidate: {
      id: '',
      idInterviewer: '',
      name: '',
      email: '',
      type: '',
      skills: [],
      evaluated: false,
      interview: []
    },
    skills: [],
    listQuestions: []
  }

  const [state, dispatch] = useReducer(candidateReducer, initialState);

  const getCandidate = async interviewer => {
    try {
      const response = await clientAxios.get('candidate');

      const candidateSel = response.data.filter(candidateCheck => candidateCheck.idInterviewer === interviewer.id);

      if (candidateSel) {
        dispatch({
          type: GET_CANDIDATE,
          payload: candidateSel[0]
        });
      } else {
        dispatch({
          type: UNSELECT_CANDIDATE
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  const addCandidate = async (candidate) => {

    try {
      const response = await clientAxios.post('candidate', candidate);

      dispatch({
        type: ADD_CANDIDATE,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  const updateCandidate = async (candidate) => {

    try {
      const response = await clientAxios.put(`candidate/${candidate.id}`, candidate);

      dispatch({
        type: ADD_SKILLS,
        payload: response.data
      })
    } catch (error) {
      console.log(error);
      candidate.skills = [];
      dispatch({
        type: FAIL_SKILLS,
        payload: candidate
      })
    }
  }

  const getSummarySkills = async () => {

    try {
      const response = await clientAxios.get('summarySkills');

      dispatch({
        type: GET_SKILLS,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  const getQuestions = async idSkill => {

    try {
      const response = await clientAxios.get(`skills/${idSkill}`);
      // eslint-disable-next-line
      response.data.questions.map(question => {
        dispatch({
          type: GET_QUESTIONS,
          payload: question
        });
      })
    } catch (error) {
      console.log(error);
    }
  }

  const sendQuestions = async listQuestions => {
    let candidateSend = state.candidate;

    candidateSend.interview = listQuestions;
    candidateSend.evaluated = true;

    console.log(candidateSend);

    try {
      const response =await clientAxios.put(`candidate/${candidateSend.id}`, candidateSend);

      console.log(response);
      dispatch({
        type: SEND_QUESTIONS,
        payload: response.data
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <candidateContext.Provider
      value={{
        candidate: state.candidate,
        skills: state.skills,
        listQuestions: state.listQuestions,
        getCandidate,
        addCandidate,
        updateCandidate,
        getSummarySkills,
        getQuestions,
        sendQuestions
      }}
    >
      {props.children}
    </candidateContext.Provider>
  )
}

export default CandidateState;