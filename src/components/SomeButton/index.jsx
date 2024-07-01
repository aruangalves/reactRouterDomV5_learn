import { useContext } from "react";
import { GlobalContext } from "../../contexts/AppContext";




export const InvertButton = () =>{
  const context = useContext(GlobalContext);
  const { actions: {invertTitle} } = context;
  return (<button type="button" onClick={ () => invertTitle()}>Invert title</button>);
}

export const ChangeButton = () =>{
  const context = useContext(GlobalContext);
  const { actions: {changeTitle} } = context;
  return (<button type="button" onClick={ () => changeTitle('This class went on a needless tangent')}>Change title</button>);
}
