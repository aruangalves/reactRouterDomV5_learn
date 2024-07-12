import { useEffect, useRef, useState } from "react";

//this is not an all-encompassing function to compare objects, but suits well enough for our needs
const isObjectEqual = (objA, objB) => {
  return JSON.stringify(objA) === JSON.stringify(objB);
}

//Usage: const [result, loading] = useFetch();
export const useFetch = (url, options) =>{
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  //The 'options' dependency causes an infinite loop, this is due to the options being a JavaScript object instead of a primitive type. This means an object with similar attributes will never be detected as equal to a previous, similar object. Example: {} === {} returns false. useRef solves the dependency issue that caused an infinite loop on useEffect
  const urlRef = useRef(url);
  const optionsRef = useRef(options);

  //Reload if the reference values are outdated
  useEffect(()=>{
    let shouldReload = false;

    if(!isObjectEqual(url,urlRef.current)){
      urlRef.current = url;
      shouldReload = true;
    }
    if(!isObjectEqual(options,optionsRef.current)){
      optionsRef.current = options;
      shouldReload = true;
    }

    if(shouldReload){
      setReload((r) => !r);
    }

  },[url, options]);


  useEffect(()=>{
    let wait = false;

    const controller = new AbortController();
    const signal = controller.signal;

    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(urlRef.current, {signal, ...optionsRef.current});
        const jsonResponse = await response.json();

        if(!wait){
          setResult(jsonResponse);
          setLoading(false);
        }

      }
      catch(error){
        if(!wait){
          setLoading(false);
        }
        console.warn(error.message);
      }

    };
    fetchData();

    //cleanup done to prevent fetching when the page components are dismounted
    return () => {
      wait = true;
      controller.abort();
    };
  },[reload]);

  return [result, loading];
};
