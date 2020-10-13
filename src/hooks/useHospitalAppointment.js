import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { APPOINTMENT_FETCH, APPOINTMENT_RESOLVE } from "../store/types/appointmentsTypes";
import { SET_ERROR } from "../store/types/notificationTypes";
import { serverRequest } from "../utils/serverRequest";

const useHospitalAppointment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  const { token } = useSelector((state) => state.auth);
  const { appointment } = useSelector((state) => state.appointments);

  const dispatch = useDispatch();
  const { appointmentId } = useParams()

  useEffect(() => {
    isMounted.current = true;
    const getAppointment = async () => {
      try {
        setIsLoading(true);
        dispatch({ type: APPOINTMENT_FETCH });
        const endpoint = `${process.env.REACT_APP_API}/hospitals/appointments/${appointmentId}`;
        const response = await serverRequest(token).get(endpoint);
        if (isMounted.current) {
          dispatch({
            type: APPOINTMENT_RESOLVE,
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
  }, [token, dispatch, appointmentId]);

  return { isLoading, appointment };
};

export default useHospitalAppointment;
