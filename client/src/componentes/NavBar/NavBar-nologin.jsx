
import 'bootstrap'
import logo from '../../recursos/logo.png'


const NavBarNoLogIn = () => {
  return ( 
        <div >
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={logo} height="100px" alt="logo" className="d-inline-block align-text-top px-5" />                        
                    </div>
                    <div className="col">
                        <p className="fs-2">StudyRooms</p>
                    </div>
                    <div className="col">
                        <p>_</p>
                    </div>
                </div>
            </div>
    </div>
  )
}
export default NavBarNoLogIn;