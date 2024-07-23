import { useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";

export const Abc = () =>{
  const {slug, id} = useParams();
  const location = useLocation();
  const history = useHistory();

  console.log(location);

  console.log(history);

  useEffect(()=>{
    setTimeout(function(){
      history.push('/');
    },3000);
  },[history]);

  return (
    <div>
      <h1>ABC Testing route with {slug} and #{id}</h1>
    </div>
  );
};
