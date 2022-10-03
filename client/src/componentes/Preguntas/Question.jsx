

export default function Question({title, description, ratingAverage, userId, likes, categories}) {
    console.log (categories)

    return(

        <div className='container containerQuestions'>
            <h3> {title} </h3>
            <h4> {description} </h4>
            <p>By: { userId }</p>
            
            <div className='d-flex'>
                <p className='d-flex justify-content-start me-auto'>  {categories.map(e=>{
                return(
                <div key={e.id}>
                <button className='mx-3 px-1'> {e.category}</button>
                </div>)}
                )}</p>  
               
                <p>Rating: { ratingAverage }</p>
                <p>Likes: { likes } </p>
            </div>

        </div>
    )
}



