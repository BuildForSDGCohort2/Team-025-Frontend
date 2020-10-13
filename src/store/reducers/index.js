import { combineReducers } from "redux";
import authReducer from "./authReducer";
import appointmentsReducer from "./appointmentsReducer";
import notificationReducer from "./notificationReducer";
import sideBarReducer from "./sideBarReducer";
import requestsReducer from "./requestsReducer";
import myRequestsReducer from "./myRequestsReducer";
import emailsReducer from "./emailsReducer";
import banksReducer from "./banksReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  appointments: appointmentsReducer,
  notification: notificationReducer,
  sidebar: sideBarReducer,
  requests: requestsReducer,
  myRequests: myRequestsReducer,
  emails: emailsReducer,
  banks: banksReducer
});

export default rootReducer;
