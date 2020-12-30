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

      return {
        variant: 'success',
        message: 'Se obtuvieron los entrevistadores'
      }
      
    } catch (error) {
      console.log(error);

      return {
        variant: 'danger',
        message: 'Ocurrió un error al cargar a los usuarios. Intente más tarde'
      }
    }
  }

  const addInterviewer = async interviewer => {
    
    try {
      const response = await clientAxios.post('interviewer', interviewer);

      dispatch({
        type: ADD_INTERVIEWER,
        payload: response.data
      });

      return {
        variant: 'success',
        message: 'Entrevistador dado de alta con éxito'
      }
    } catch (error) {
      console.log(error);
      return {
        variant: 'danger',
        message: 'Ocurrió un error durante el proceso. Intente más tarde'
      }
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