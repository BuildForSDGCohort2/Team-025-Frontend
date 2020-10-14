import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BANK_RESOLVE, BANK_FETCH } from "../store/types/banksTypes";
import { SET_ERROR } from "../store/types/notificationTypes";
import { serverRequest } from "../utils/serverRequest";
import { useParams } from "react-router-dom";

const useBank = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  const { token } = useSelector((state) => state.auth);
  const { pant } = useSelector((state) => state.banks);

  const dispatch = useDispatch();
  const { pantId } = useParams()

  useEffect(() => {
    isMounted.current = true;
    const getPant = async () => {
      try {
        setIsLoading(true);
        dispatch({ type: BANK_FETCH });
        const endpoint = `${process.env.REACT_APP_API}/hospitals/banks/${pantId}`;
        const response = await serverRequest(token).get(endpoint);
        if (isMounted.current) {
          dispatch({
            type: BANK_RESOLVE,
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
    getPant();
    return () => {
      isMounted.current = false;
    };
  }, [token, dispatch, pantId]);

  return { isLoading, pant };
};

export default useBank;
