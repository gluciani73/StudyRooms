

export default function Question({title, description, ratingAverage, userId, likes, categories, ratingCount}) {

    return(

        <div className='container containerQuestions'>
            <h3> {title} </h3>
            <h4> {description} </h4>
            <p>By: { userId }</p>
            
            <div className='d-flex'>
                <div className='d-flex justify-content-start me-auto'>  {categories.map(e=>{
                return(
                <div key={e.id}>
                <button className='mx-3 px-1'> {e.category}</button>
                </div>)}
                )}</div>  
               
                <p>Rating: { ratingAverage }</p>
                <p>Rating count: {Number(ratingCount)} </p>
                <p>Likes: { likes } </p>
            </div>

        </div>
    )
}



