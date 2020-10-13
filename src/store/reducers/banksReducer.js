import {
  BANKS_RESOLVE, BANK_CANCEL, BANK_FETCH,
  BANK_REJECT, BANK_RESOLVE
} from "../types/banksTypes";

const initialState = {
	status: "idle",
  pants: null,
  pant: null
};

const banksReducer = (state = initialState, action) => {
	switch (action.type) {
		case BANK_FETCH:
			return {
				...state,
				status: "loading"
			};
		case BANK_RESOLVE:
			return {
				...state,
				status: "success",
				pant: action.payload
      };
    case BANKS_RESOLVE:
      return {
        ...state,
        status: "success",
        pants: action.payload
      };
		case BANK_REJECT:
			return {
				...state,
				status: "failure"
			};
		case BANK_CANCEL:
			return {
				...state,
				status: "idle"
			};
		default:
			return state;
	}
};

export default banksReducer;
