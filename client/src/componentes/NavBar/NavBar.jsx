import { Link } from 'react-router-dom'
import 'bootstrap'
import logo from '../../recursos/logo.png'
import home from '../../recursos/home.png'
import DropDown from './DropDown'
import SearchBar from "./SearchBar"
import { useSelector } from 'react-redux'


const NavBar = () => {

    const userInfo = useSelector(state => state.loginReducer.userInfo);

  return (
   <div >
   <nav className="navbar navbar-expand-lg navbar-light bg-white">
           <div className='d-inline-flex p-2 align-items-center auto-mx'>

            <Link to={'../home'}>
               <img className="me-5" src={logo} height="100px" alt="logo" />
               </Link>   

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
                  <SearchBar/>
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