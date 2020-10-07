import {
	SET_ERROR,
	CLEAR_NOTIFICATION,
	SET_SUCCESS
} from "../types/notificationTypes";

// Initial State
const initialState = {
	error: null,
	message: null
};

const notificationReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ERROR: {
      const error = action.payload;

			let setError;
			if(error.response && error.response.data && error.response.data.error && Object.keys(error.response.data.error)[0]){
        if(typeof error.response.data.error === 'object' && error.response.data.error !== null){
          setError = error.response.data.error[Object.keys(error.response.data.error)[0]][0];
        } else {
          setError = error.response.data.error;
        }
      } else if (error.response.data.message) {
				setError = error.response.data.message
			} else if (error.request) {
				setError = "Slow or no internet, please refresh";
			} else {
				setError = error.message;
      }
			return {
				...state,
				error: setError,
				message: null
			};
		}
		case SET_SUCCESS: {
			return {
				...state,
				error: null,
				message: action.payload
			};
		}
		case CLEAR_NOTIFICATION: {
			return {
				...state,
				error: null,
				message: null
			};
		}
		default: {
			return state;
		}
	}
};

export default notificationReducer;
