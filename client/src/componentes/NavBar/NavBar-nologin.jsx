
import 'bootstrap'
import logo from '../../recursos/logo.png'


const NavBarNoLogIn = () => {
  return ( 
        <div >
            <div class="container">
                <div class="row">
                    <div class="col">
                        <img src={logo} height="100px" alt="logo" class="d-inline-block align-text-top px-5" />                        
                    </div>
                    <div class="col">
                        <p class="fs-2">StudyRooms</p>
                    </div>
                    <div class="col">
                        <p>_</p>
                    </div>
                </div>
            </div>
    </div>
  )
}
export default NavBarNoLogIn;