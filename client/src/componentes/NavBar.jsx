import { Link } from "react-router-dom";

const NavBar = () => {
  return ( 
  <div>
    <h1>NavBar</h1>
    <Link to='/Home'>Home</Link>
    <Link to='/Temas'>Temas</Link>
    <Link to='/Usuarios'>Usuarios</Link>
    <Link to='/Donacion'>Donacion</Link>
  </div>
   );
}
 
export default NavBar;