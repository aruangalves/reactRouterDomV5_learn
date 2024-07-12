import { useState, useCallback, useEffect } from "react";

export const useAsync = (asyncFunc, shouldRun = true) => {
  const [state, setState] = useState({
    result: null,
    error: null,
    status: 'idle',
  });

  const run = useCallback(()=>{
    setState({result: null, error: null, status: 'pending'});

    return asyncFunc().then((response) => {
      setState({result: response, error: null, status: 'settled'});
    }).catch((e) => {
      setState({result: null, error: e, status: 'error'});
    });
  },[asyncFunc]);

  useEffect(()=>{
    if(shouldRun){
      run();
    }
  },[run, shouldRun]);

  return [run, state];
};
