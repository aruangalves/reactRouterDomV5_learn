import { useEffect, useRef, useState } from "react";

//Usage: const [result, loading] = useFetch();
export const useFetch = (url, options) =>{
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  //The 'options' dependency causes an infinite loop, this is due to the options being a JavaScript object instead of a primitive type. This means an object with similar attributes will never be detected as equal to a previous, similar object. Example: {} === {} returns false.
  useEffect(()=>{
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const jsonResponse = await response.json();
        setResult(jsonResponse);
        setLoading(false);
      }
      catch(error){
        setLoading(false);
        throw error;
      }

    };
    fetchData();
  },[url, options]);

  return [result, loading];
};
