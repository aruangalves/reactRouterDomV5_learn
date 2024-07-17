import { Children, cloneElement, createContext, useContext, useState } from "react";

const TurnOnOffContext = createContext();

export const TurnOnOff = ({children}) =>{
  const [isOn, setIsOn] = useState(false);

  const switchOn = () =>{
    setIsOn(s => !s);
  };

  return <TurnOnOffContext.Provider value={{isOn, switchOn}}>{children}</TurnOnOffContext.Provider>;

  /*return Children.map(children, (child) =>{
    if(typeof child.type === 'string'){
      return child;
    }
    const newChild = cloneElement(child, {
      isOn,
      switchOn
    });
    return newChild;
  });*/
};

export const TurnedOn = ({children}) => {
  const {isOn} = useContext(TurnOnOffContext);
  return isOn ? children : null;
};

export const TurnedOff = ({children}) => {
  const {isOn} = useContext(TurnOnOffContext);
  return isOn ? null : children;
};

export const TurnedButton = () =>{
  const {isOn, switchOn} = useContext(TurnOnOffContext);
  return <button onClick={switchOn}>Turn {isOn ? 'off' : 'on'}</button>
};
