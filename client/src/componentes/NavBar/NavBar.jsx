import { Link } from 'react-router-dom'
import 'bootstrap'
import logo from '../../recursos/logo.png'
import config from '../../recursos/config.png'
import notification from '../../recursos/notification.png'
import home from '../../recursos/home.png'
import DropDown from './DropDown'
import {useSelector} from "react-redux";



const NavBar = () => {

    const userInfo = useSelector(state => state.loginReducer.userInfo);

  return (
   <div >
   <nav className="navbar navbar-expand-lg navbar-light bg-white">
           <div className='d-inline-flex p-2 align-items-center auto-mx'>
               
               <img src={logo} height="100px" alt="logo" />
               <p className="navbar-brand pe-5 fs-1">StudyRooms</p>
           </div>
           <div className='col-md-auto'>
            
               <div className='row align-items-center'>
                   <div className="btn-group" role="group" aria-label="Basic example">
                       <Link to="/Home"><button type="button" className="btn btn-primary"> <img src={home} alt="homeImg" height="20px" /> Home</button></Link>
                       <Link to="/AskQuestion"><button type="button" className="btn btn-primary">Ask Question</button></Link>
                       <Link to="/Donations"><button type="button" className="btn btn-primary">Donate</button></Link>
                       {userInfo && userInfo.isAdmin && (
                           <Link to="/admin-panel"><button type="button" className="btn btn-danger">Users</button></Link>
                       )}
                   </div>
               </div>
           </div>
           <div className='col-md-auto align-items-center auto-mx'>
               <div className='row'>
                  <form className="d-flex px-5 ">
                     <input className="form-control me-2 px-5" type="search" placeholder="Search" aria-label="Search"/>
                     <button className="btn btn-primary" type="submit">Search</button>
                  </form>
               </div>
           </div>
           <div className='col-md-auto align-items-center auto-mx ' >
               <div className="row align-items-center">
                  {/* <p className="col-md-auto" href="#"><img src={config} alt="config" height='30px'/></p>
                  <p className="col-md-auto" href="#"><img src={notification} alt="notifications"height='30px'/> </p> */}
                  <DropDown />
               </div>
           </div>
   </nav>
</div> 

      

   );
}
 
export default NavBar;