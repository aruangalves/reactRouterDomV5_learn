import { useEffect, useRef } from "react";

export const useMyHook = (cb, delay = 1000) => {
  const savedCb = useRef();

  useEffect(()=>{
    savedCb.current = cb;
  }, [cb]);

  useEffect(()=>{
    const interval = setInterval(()=>{
      savedCb.current();
    }, delay);

    return () => clearInterval(interval);
  },[delay]);
};
