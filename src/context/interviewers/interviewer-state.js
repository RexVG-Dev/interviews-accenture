import React, { useReducer } from 'react';
import clientAxios from "../../config/axios";

import interviewerContext from './interviewer-context';
import interviewerReducer from './interviewer-reducer';
import {
  GET_INTERVIEWER,
  ADD_INTERVIEWER,
  SELECT_INTERVIEWER
} from '../../types';

const InterviewerState = props => {

  const initialState = {
    interviewers: [],
    selectedInterviewer: {
      id: ''
    }
  }

  const [ state, dispatch ] = useReducer( interviewerReducer, initialState);

  const getInterviewers = async () => {

    try {
      const response = await clientAxios.get('interviewer');

      dispatch({
        type: GET_INTERVIEWER,
        payload: response.data
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  const addInterviewer = async interviewer => {
    
    try {
      const response = await clientAxios.post('interviewer', interviewer);

      dispatch({
        type: ADD_INTERVIEWER,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  }

  const selectInterviewer = (interviewer) => {

    dispatch({
      type: SELECT_INTERVIEWER,
      payload: interviewer
    });
  }


  return(
    <interviewerContext.Provider
      value={{
        interviewers: state.interviewers,
        selectedInterviewer: state.selectedInterviewer,
        getInterviewers,
        addInterviewer,
        selectInterviewer
      }}
    >
      {props.children}
    </interviewerContext.Provider>
  )
}

export default InterviewerState;