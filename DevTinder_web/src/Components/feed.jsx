import { useNavigate } from "react-router-dom";

function Feed(){
  const naviage=useNavigate();
  return (
    <div>
        <button onClick={()=>naviage('/profile')}>Save</button>
    </div>
  )
}

export default Feed