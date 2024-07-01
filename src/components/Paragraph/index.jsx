import { useContext } from "react";
import { GlobalContext } from "../../contexts/AppContext";

export const Paragraph = () =>{
  const context = useContext(GlobalContext);
  const {
    state: {body, counter},
    state,
    setState
  } = context;
  const bodyStart = body.substring(0, 5);
  const bodyEnd = body.substring(4);
  return (<p onClick={() => setState(s => ({...s, counter: s.counter + 1}))}>{bodyStart}<code>src/App.jsx</code>{bodyEnd}</p>);
};
