
import 'bootstrap'
import logo from '../../recursos/logo.png'
import config from '../../recursos/config.png'
import notification from '../../recursos/notification.png'
import user from '../../recursos/user.png'
import home from '../../recursos/home.png'

const NavBar = () => {
  return ( 
   <div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
         
         
         <div class="container-fluid">
            <img src={logo} height="100px" alt="logo" class="d-inline-block align-text-top" />
            <a class="navbar-brand pe-5" href="#">StudyRooms</a>
            
            <form class="d-flex">
               <button type="button" class="btn btn-primary d-flex rounded-pill">
                  <img class="pe-3" src={home} alt="home" height='30px' />
                  <a class="nav-link active" aria-current="page" href="#"><span class="align-middle">     Home</span></a>
               </button>
            </form>
            
            <form class="d-flex px-5">
               <input class="form-control me-2 px-5" type="search" placeholder="Search" aria-label="Search"/>
               <button class="btn btn-primary" type="submit">Search</button>
            </form>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" >
               <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
               <div class="navbar-nav">
                  <button type="button" class="btn btn-primary d-flex rounded-pill px-5">Preguntame!</button>
                  <a class="nav-link" href="#"><img src={config} alt="config" height='30px'/></a>
                  <a class="nav-link" href="#"><img src={notification} alt="notifications"height='30px'/> </a>
                  <a class="nav-link" href="#"><img src={user} alt="user"height='30px'/> </a>
            </div>
         </div>
      </div>


   </nav>
</div>    

       


      

   );
}
 
export default NavBar;