//import comments from '../../recursos/comments.png'
//import views from '../../recursos/eye.png'
import upVote from '../../recursos/thumbs.png'
import stars from '../../recursos/star.png'



export default function Question({title, description, ratingAverage, userId, likes}) {
    return(

        <div className='container containerQuestions'>
            <h3> {title} </h3>
            <h4> {description} </h4>
            <p>By: { userId }</p>
            <div className='d-flex justify-content-end'>
                <p>Rating: { ratingAverage }</p>
                <p>Likes: { likes } </p>
            </div>
        </div>
    )
}