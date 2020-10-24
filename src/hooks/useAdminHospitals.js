import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HOSPITALS_RESOLVE, HOSPITAL_FETCH } from "../store/types/hospitalsTypes";
import { SET_ERROR } from "../store/types/notificationTypes";
import { serverRequest } from "../utils/serverRequest";

const useAdminHospitals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  const { token } = useSelector((state) => state.auth);
  const { hospitals } = useSelector((state) => state.hospitals);

  const dispatch = useDispatch();

  useEffect(() => {
    isMounted.current = true;
    const getHospitals = async () => {
      try {
        setIsLoading(true);
        dispatch({ type: HOSPITAL_FETCH });
        const endpoint = `${process.env.REACT_APP_API}/admin/hospitals`;
        const response = await serverRequest(token).get(endpoint);
        if (isMounted.current) {
          dispatch({
            type: HOSPITALS_RESOLVE,
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
    getHospitals();
    return () => {
      isMounted.current = false;
    };
  }, [token, dispatch]);

  return { isLoading, hospitals };
};

export default useAdminHospitals;
