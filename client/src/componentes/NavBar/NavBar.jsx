
import 'bootstrap'
import logo from '../../recursos/logo.png'
import config from '../../recursos/config.png'
import notification from '../../recursos/notification.png'
import user from '../../recursos/user.png'
import home from '../../recursos/home.png'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return ( 
   <div >

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
         
         
         <div className="container-fluid">
            <img src={logo} height="100px" alt="logo" />
            <p className="navbar-brand pe-5" href="#">StudyRooms</p>

            <p className="nav-link px-5" href="#"></p>
            <p className="nav-link px-5" href="#"></p>

            <form className="d-flex">
               <Link to="/Home">
               <button type="button" className="btn btn-primary d-flex rounded-pill">
                  <img className="pe-3" src={home} alt="home" height='30px' />
                  <p className="nav-link active" aria-current="page" href="/Home"><span className="align-middle">Home</span></p>
               </button>
               </Link>
            </form>
            
            


            <form className="d-flex px-5">
               <input className="form-control me-2 px-5" type="search" placeholder="Search" aria-label="Search"/>
               <button className="btn btn-primary" type="submit">Search</button>
            </form>
            
           


            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" >
               <span className="navbar-toggler-icon"></span>
            </button>


            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
               <div className="navbar-nav">
                  <form className="d-flex"> 
            
                     <button type="button" className="btn btn-primary d-flex rounded-pill text-muted">
                        <p className="nav-link active" aria-current="page" href="/CrearPreguntas"><span className="align-middle">+ Ask Question</span></p>
                     </button>
                  </form>
            
                  <form className="d-flex"> 
            <Link to="/Donacion">
            <button type="button" className="btn btn-primary d-flex rounded-pill text-muted">
               <p className="nav-link active" aria-current="page" href="/Donaciones"><span className="align-middle">+ Donations</span></p>
            </button>
            </Link>
         </form>


                  <p className="nav-link px-5" href="#"></p>
            <p className="nav-link px-5" href="#"></p>
            

                  <p className="nav-link ps-5" href="#"><img src={config} alt="config" height='30px'/></p>
                  <p className="nav-link " href="#"><img src={notification} alt="notifications"height='30px'/> </p>
                  <p className="nav-link pe-5" href="#"><img src={user} alt="user"height='30px'/> </p>
            </div>
         </div>
      </div>


   </nav>
</div>    

       


      

   );
}
 
export default NavBar;