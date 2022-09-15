

import Filters from "./Filters";
import NavBar from "../NavBar/NavBar";


const Home = () => {
  return (<div>
    <div class="position-absolute top-0 end-50">
    <NavBar/>
    </div>
    <div class="position-absolute bottom-50 start-0">
    <Filters/>
    </div>
    <h1>Home</h1>

    <h3>Ipsum Lorem</h3>
  </div>  );
}
 
export default Home;