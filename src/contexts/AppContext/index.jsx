import { createContext, useReducer } from "react";
import { globalState } from "./data";
import { reducer } from "./reducer";

export const GlobalContext = createContext();

export const AppContext = ({children}) => {
  //const [state, setState] = useState(globalState);
  const [state, dispatch] = useReducer(reducer, globalState);

  const actions = {
    changeTitle: (title) => {
      dispatch({type: 'CHANGE_TITLE', payload: title});
    },
    increaseCounter: () => {
      dispatch({type: 'INCREASE_COUNTER'});
    },
    invertTitle: () =>{
      dispatch({type: 'INVERT_TITLE'});
    },
  };


  return <GlobalContext.Provider value={{state, actions}}>{children}</GlobalContext.Provider>
};
