import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { AUTH_CANCELED } from "../store/types/authTypes";
import { CLEAR_NOTIFICATION } from "../store/types/notificationTypes";

const NotificationBar = () => {

  // const history = useHistory();
  const notification = useSelector(state => state.notification);

  const dispatch = useDispatch();
  const isMounted = useRef(false);
  const msg = useRef();

  const { error, message } = notification;

	const errorList = [
    "invalid signature",
    "jwt malformed",
    "auth/id-token-expired",
    "Unauthenticated.",
    "Token you provided is invalid",
    "Token missing, you need a token to have access",
    "JWT token has expired, please login to obtain a new one",
    "jwt expired"
  ];

	msg.current = error;

	useEffect(() => {
    isMounted.current = true;
		if (error && isMounted.current) {
			if (errorList.includes(error)) {
				dispatch({ type: AUTH_CANCELED });
				dispatch({ type: CLEAR_NOTIFICATION });
			} else {
				if (errorList.includes(error)) {
					msg.current = "Ops something went wrong, please try later";
        }

        toast.error(msg);

				dispatch({ type: CLEAR_NOTIFICATION });
			}
		}
		if (message && isMounted.current) {
      toast.success(message);
			dispatch({ type: CLEAR_NOTIFICATION });
    }
    return () => {
      isMounted.current = false;
    }
  }, [error, message, dispatch, errorList]);

	return null;
};

export default NotificationBar;
