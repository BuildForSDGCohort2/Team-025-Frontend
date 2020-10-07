import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SET_ERROR } from "../store/types/notificationTypes";
import { MYREQUEST_FETCH, MYREQUEST_RESOLVE } from "../store/types/myRequestsTypes";
import { serverRequest } from "../utils/serverRequest";

const useMyRequest = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  const { token } = useSelector((state) => state.auth);
  const { myRequest } = useSelector((state) => state.myRequests);

  const dispatch = useDispatch();
  const { requestId } = useParams();

  useEffect(() => {
    isMounted.current = true;
    const getRequest = async () => {
      try {
        setIsLoading(true);
        dispatch({ type: MYREQUEST_FETCH });
        const endpoint = `${process.env.REACT_APP_API}/request/${requestId}`;
        const response = await serverRequest(token).get(endpoint);
        if (isMounted.current) {
          dispatch({
            type: MYREQUEST_RESOLVE,
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
    getRequest();
    return () => {
      isMounted.current = false;
    };
  }, [token, dispatch, requestId]);

  return { isLoading, myRequest };
};

export default useMyRequest;
