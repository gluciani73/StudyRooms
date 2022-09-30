//import comments from '../../recursos/comments.png'
//import views from '../../recursos/eye.png'
import upVote from '../../recursos/thumbs.png'
import stars from '../../recursos/star.png'



export default function Question({title, description, ratingAverage, userId, likes}) {

 
    
    return(

    <div className="d-inline-flex container border">
        <div className="row">
           
        <h2 className="row ms-1"> {title}</h2>
    
        <div className="col d-inline-flex">
            
            <p>rating: {ratingAverage}</p>
            <img className="ms-2" src={stars} alt="" height="20px" width="20px"/>
        </div>
        <div className="col d-inline-flex">
             
             <p>likes: {likes}</p>
             <img className="ms-2" src={upVote} alt="" height="20px" width="20px" />
        </div>
        



        <div className="row">
            <p>description:</p>
            <p>{description}</p>
        </div>

        <div className="row">
            
            <p>Author:{userId}</p>
        </div>

    </div>
    </div>


    );
}