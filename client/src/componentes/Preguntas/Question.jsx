//import comments from '../../recursos/comments.png'
//import views from '../../recursos/eye.png'
import upVote from '../../recursos/thumbs.png'
import stars from '../../recursos/star.png'



export default function Question({title, description, ratingAverage, voteCount, userId, isFeatured}) {

 
    
    return(

    <div>
        <div className="row">
        <p>title:</p>   
        <p className="row">{title}</p>
    
        <div className="col">
            <p>rating:</p>
            <p>{ratingAverage}</p>
            <img src={stars} alt="" height="20px" width="20px"/>
        </div>
        <div className="col">
             <p>votes:</p>
             <p>{voteCount}</p>
             <img src={upVote} alt="" height="20px" width="20px" />
        </div>
        



        <div className="row">
            <p>description:</p>
            <p>{description}</p>
        </div>

        <div className="row">
            <p>User:</p>
            <p>{userId}</p>
        </div>

    </div>
    </div>


    );
}