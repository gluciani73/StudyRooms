import comments from '../../recursos/comments.png'
import views from '../../recursos/eye.png'
import upVote from '../../recursos/thumbs.png'
import stars from '../../recursos/star.png'


export default function Question({title, description, ratingAverage, voteCount}) {
    
    return(

    <div>
        <div class="row">
        <p>title:</p>   
        <p class="row">{title}try</p>
    
        <div class="col">
            <p>rating:</p>
            <p>{ratingAverage}</p>
            <img src={stars} alt="" height="20px" width="20px"/>
        </div>
        <div class="col">
             <p>votes:</p>
             <p>{voteCount}</p>
             <img src={comments} alt="" height="20px" width="20px" />
        </div>
        <div class="row">
            <p>description:</p>
            <p>{description} ipsum</p>
        </div>
    </div>
    </div>


    );
}