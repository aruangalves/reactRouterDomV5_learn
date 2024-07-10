import props from 'prop-types';
import { createContext, useReducer } from "react";
import { globalData } from "./data";
import { reducer } from "./reducer";

export const GlobalContext = createContext();

export const AppProvider = ({children}) => {
  //const [state, setState] = useState(globalState);
  const [state, dispatch] = useReducer(reducer, globalData);

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

GlobalContext.propTypes = {
  children: props.oneOfType([props.string, props.element, props.node]).isRequired,
};
