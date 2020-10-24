import {
  HOSPITALS_RESOLVE, HOSPITAL_CANCEL, HOSPITAL_FETCH,
  HOSPITAL_REJECT, HOSPITAL_RESOLVE
} from "../types/hospitalsTypes";

const initialState = {
	status: "idle",
  hospitals: null,
  hospital: null
};

const hospitalsReducer = (state = initialState, action) => {
	switch (action.type) {
		case HOSPITAL_FETCH:
			return {
				...state,
				status: "loading"
			};
		case HOSPITAL_RESOLVE:
			return {
				...state,
				status: "success",
				hospital: action.payload
      };
    case HOSPITALS_RESOLVE:
      return {
        ...state,
        status: "success",
        hospitals: action.payload
      };
		case HOSPITAL_REJECT:
			return {
				...state,
				status: "failure"
			};
		case HOSPITAL_CANCEL:
			return {
				...state,
				status: "idle"
			};
		default:
			return state;
	}
};

export default hospitalsReducer;
