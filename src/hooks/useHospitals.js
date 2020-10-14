import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BANKS_RESOLVE, BANK_FETCH } from "../store/types/banksTypes";
import { SET_ERROR } from "../store/types/notificationTypes";
import { serverRequest } from "../utils/serverRequest";

const useHospitals = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(false);

  const { token } = useSelector((state) => state.auth);
  const { pants: hospitals } = useSelector((state) => state.banks);

  const dispatch = useDispatch();

  useEffect(() => {
    isMounted.current = true;
    const getHospitals = async () => {
      try {
        setIsLoading(true);
        dispatch({ type: BANK_FETCH });
        const endpoint = `${process.env.REACT_APP_API}/hospitals`;
        const response = await serverRequest(token).get(endpoint);
        if (isMounted.current) {
          dispatch({
            type: BANKS_RESOLVE,
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

  // const groupBy = function(xs, key) {
  //   return xs.reduce(function(rv, x) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return rv;
  //   }, {});
  // };
  // let hospitals;
  // if(pants){
  //   hospitals = groupBy(pants, 36)
  // }
  return { isLoading, hospitals };
};

export default useHospitals;
