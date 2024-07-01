import { useContext } from "react";
import { GlobalContext} from "../../contexts/AppContext"

export const Header1 = ({children}) => {
  const context = useContext(GlobalContext);
  const { state: {title, counter} } = context;
  return (<h1>{title}{counter}</h1>);
};
