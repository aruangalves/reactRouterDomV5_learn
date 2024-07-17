import { Children, cloneElement, createContext, useState } from "react";

export const TurnOnOff = ({children}) =>{
  const [isOn, setIsOn] = useState(false);

  const switchOn = () =>{
    setIsOn(s => !s);
  };

  return Children.map(children, (child) =>{
    if(typeof child.type === 'string'){
      return child;
    }
    const newChild = cloneElement(child, {
      isOn,
      switchOn
    });
    return newChild;
  });
};

export const TurnedOn = ({isOn, children}) => isOn ? children : null;

export const TurnedOff = ({isOn, children}) => isOn ? null : children;

export const TurnedButton = ({isOn, switchOn}) =>{
  return <button onClick={switchOn}>Turn {isOn ? 'off' : 'on'}</button>
};
