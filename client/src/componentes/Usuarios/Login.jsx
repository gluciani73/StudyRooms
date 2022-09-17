import { Link } from "react-router-dom";


const login = () => {
    return (<div className="container">
      
      <div className="row"></div>

      <div className="row">
        <div className="col"> </div>

        <div className="col"> 
        <Link to="./Home">
            <button>
            login placeholder
            </button>
         </Link>
        </div>
        </div>
         <div className="col"> </div>
         <div class ="row"></div>
        
    </div>  );
}
 
export default login;