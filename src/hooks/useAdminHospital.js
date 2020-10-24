import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HOSPITAL_FETCH, HOSPITAL_RESOLVE } from "../store/types/hospitalsTypes";
import { SET_ERROR } from "../store/types/notificationTypes";
import { serverRequest } from "../utils/serverRequest";

const useAdminHospital = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  const { token } = useSelector((state) => state.auth);
  const { hospital } = useSelector((state) => state.hospitals);

  const dispatch = useDispatch();
  const { hospitalId } = useParams()

  useEffect(() => {
    isMounted.current = true;
    const getHospital = async () => {
      try {
        setIsLoading(true);
        dispatch({ type: HOSPITAL_FETCH });
        const endpoint = `${process.env.REACT_APP_API}/admin/hospitals/${hospitalId}`;
        const response = await serverRequest(token).get(endpoint);
        if (isMounted.current) {
          dispatch({
            type: HOSPITAL_RESOLVE,
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
    getHospital();
    return () => {
      isMounted.current = false;
    };
  }, [token, dispatch, hospitalId]);

  return { isLoading, hospital };
};

export default useAdminHospital;
