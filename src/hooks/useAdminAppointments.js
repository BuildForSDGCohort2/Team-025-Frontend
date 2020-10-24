import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { APPOINTMENTS_RESOLVE, APPOINTMENT_FETCH } from "../store/types/appointmentsTypes";
import { SET_ERROR } from "../store/types/notificationTypes";
import { serverRequest } from "../utils/serverRequest";

const useAdminAppointments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  const { token } = useSelector((state) => state.auth);
  const { appointments } = useSelector((state) => state.appointments);

  const dispatch = useDispatch();

  useEffect(() => {
    isMounted.current = true;
    const getAppointment = async () => {
      try {
        setIsLoading(true);
        dispatch({ type: APPOINTMENT_FETCH });
        const endpoint = `${process.env.REACT_APP_API}/admin/appointments`;
        const response = await serverRequest(token).get(endpoint);
        if (isMounted.current) {
          dispatch({
            type: APPOINTMENTS_RESOLVE,
            payload: response.data.data
          });
          setIsLoading(false);
        }
      } catch (error) {
        if (isMounted.current) {
          dispatch({ type: SET_ERROR, payload: error });
          setIsLoading(false);
        }
      }
    };
    getAppointment();
    return () => {
      isMounted.current = false;
    };
  }, [token, dispatch]);

  return { isLoading, appointments };
};

export default useAdminAppointments;
