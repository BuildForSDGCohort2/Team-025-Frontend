import { EMAIL_CANCEL, EMAIL_FETCH, EMAILS_RESOLVE, EMAIL_REJECT, EMAIL_RESOLVE } from "../types/emailsTypes";

const initialState = {
  status: "idle",
  emails: null,
  email: null
};

const emailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL_FETCH:
      return {
        ...state,
        status: "loading"
      };
    case EMAIL_RESOLVE:
      return {
        ...state,
        status: "success",
        email: action.payload
      };
    case EMAILS_RESOLVE:
      return {
        ...state,
        status: "success",
        emails: action.payload
      };
    case EMAIL_REJECT:
      return {
        ...state,
        status: "failure"
      };
    case EMAIL_CANCEL:
      return {
        ...state,
        status: "idle"
      };
    default:
      return state;
  }
};

export default emailsReducer;
