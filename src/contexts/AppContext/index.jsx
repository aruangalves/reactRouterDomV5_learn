import { createContext, useState, useReducer } from "react";
import { globalState } from "./data";

export const GlobalContext = createContext();

const reducer = (state, action) => {
  switch(action.type){
    case 'changeTitle': {
      return {...state, title: action.payload +' #'};
    }
    case 'increaseCounter':{
      const { counter } = state;
      return {...state, counter: counter + 1};
    }
    case 'invertTitle': {
      const { title } = state;
      return {...state, title: title.split('').reverse().join('')};
    }

  }

  return {...state};
};

export const AppContext = ({children}) => {
  //const [state, setState] = useState(globalState);
  const [state, dispatch] = useReducer(reducer, globalState);


  return <GlobalContext.Provider value={{state, dispatch}}>{children}</GlobalContext.Provider>
};
