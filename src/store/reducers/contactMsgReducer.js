import {
  APPOINTMENT_CANCEL,
  APPOINTMENT_FETCH,
  APPOINTMENTS_RESOLVE,
  APPOINTMENT_REJECT,
  APPOINTMENT_RESOLVE
} from "../types/appointmentsTypes";

const initialState = {
  status: "idle",
  appointments: null,
  appointment: null
};

const contactMsgReducer = (state = initialState, action) => {
  switch (action.type) {
    case APPOINTMENT_FETCH:
      return {
        ...state,
        status: "loading"
      };
    case APPOINTMENT_RESOLVE:
      return {
        ...state,
        status: "success",
        appointment: action.payload
      };
    case APPOINTMENTS_RESOLVE:
      return {
        ...state,
        status: "success",
        appointments: action.payload
      };
    case APPOINTMENT_REJECT:
      return {
        ...state,
        status: "failure"
      };
    case APPOINTMENT_CANCEL:
      return {
        ...state,
        status: "idle"
      };
    default:
      return state;
  }
};

export default contactMsgReducer;
