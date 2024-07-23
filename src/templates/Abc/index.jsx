import { useParams } from "react-router-dom";

export const Abc = () =>{
  const {slug, id} = useParams();

  return (
    <div>
      <h1>ABC Testing route with {slug} and #{id}</h1>
    </div>
  );
};
