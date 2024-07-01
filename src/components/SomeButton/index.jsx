import { useContext } from "react";
import { GlobalContext } from "../../contexts/AppContext";




export const InvertButton = () =>{
  const context = useContext(GlobalContext);
  const { dispatch } = context;
  return (<button type="button" onClick={ () => dispatch({type:'invertTitle'})}>Invert title</button>);
}

export const ChangeButton = () =>{
  const context = useContext(GlobalContext);
  const { dispatch } = context;
  return (<button type="button" onClick={ () => dispatch({type: 'changeTitle', payload: 'This class went on a needless tangent'})}>Change title</button>);
}
