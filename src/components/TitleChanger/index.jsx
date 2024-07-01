import { useContext, useRef } from "react";
import { GlobalContext } from "../../contexts/AppContext";

export const TitleChanger = () => {
  const context = useContext(GlobalContext);
  const {actions: {changeTitle}} = context;
  const inputRef = useRef();
  return (
    <>
      <label>Change the title: </label>
      <input type="text" ref={inputRef} onKeyUp={() => changeTitle(inputRef.current.value)}></input>
    </>
  );
}
