import {
  GET_INTERVIEWER,
  ADD_INTERVIEWER,
  SELECT_INTERVIEWER
} from '../../types';

// eslint-disable-next-line
export default (state, action ) => {
  switch(action.type) {
    case GET_INTERVIEWER:
      return {
        ...state,
        interviewers : action.payload,
        selectedInterviewer: null
      }
    case ADD_INTERVIEWER:
      return {
        ...state,
        interviewers: [
          ...state.interviewers,
          action.payload
        ],
        selectedInterviewer: null
      }
    case SELECT_INTERVIEWER:
      return {
        ...state,
        selectedInterviewer: action.payload
      }
    default:
      return state;
  }
}