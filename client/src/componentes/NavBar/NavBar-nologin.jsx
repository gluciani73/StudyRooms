
import 'bootstrap'
import logo from '../../recursos/logo.png'


const NavBarNoLogIn = () => {
  return ( 
    <div >
    <nav className="navbar navbar-expand-lg navbar-light bg-white">
    <img src={logo} height="100px" alt="logo" />
          <p className="navbar-brand pe-5 fs-1">StudyRooms</p>
    </nav>
 </div>    

  )
}
export default NavBarNoLogIn;