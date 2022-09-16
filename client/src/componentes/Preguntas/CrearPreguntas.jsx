import Navbar from '../NavBar/NavBar'

const CrearPreguntas = () => {
    return (
        <div>
            <Navbar/>
                <div class="container border border-secondary">
                    <p class=" fs-2 text-center pt-2"> Make a Question for our community </p>


                    <form>
                        <div class="mb-3">
                        <label for="Titletitle" class="form-label fs-2">Title</label>
                        <input type="title" class="form-control" id="QuestionTitle" aria-describedby="Qtitle"/>
                        <div id="TitleUnderText" class="form-text">this title helps users understand the general idea of your question</div>
                    </div>
                    <div class="mb-3">
                        <label for="MainQuestion" class="form-label fs-3">Question</label>
                        <input type="QuestionBody" class="form-control" id="Qbody"/>
                        <div id="QuestionUnderText" class="form-text">Check yout grammar and be as specific as you can!</div>
                    </div>
                    <div class="mb-3 form-check container">
                        <div class="row">
                            <div class="col">
                                <input type="checkbox" class="form-check-input" id="subject1"/>
                                <label class="form-check-label" for="exampleCheck1">Math</label>
                            </div>
                            <div class="col">
                                <input type="checkbox" class="form-check-input" id="subject1"/>
                                <label class="form-check-label" for="exampleCheck1">History</label>
                            </div>
                            <div class="col">
                                <input type="checkbox" class="form-check-input" id="subject1"/>
                                <label class="form-check-label" for="exampleCheck1">Geography</label>
                            </div>
                            <div class="col">
                                <input type="checkbox" class="form-check-input" id="subject1"/>
                                <label class="form-check-label" for="exampleCheck1">Chemistry</label>
                            </div>
                            <div class="col">
                               <input type="checkbox" class="form-check-input" id="subject1"/>
                                <label class="form-check-label" for="exampleCheck1">Biology</label>
                            </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="subject1"/>
                                    <label class="form-check-label" for="exampleCheck1">Economics</label>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="subject1"/>
                                    <label class="form-check-label" for="exampleCheck1">Programming</label>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="subject1"/>
                                    <label class="form-check-label" for="exampleCheck1">Filosofia</label>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="subject1"/>
                                    <label class="form-check-label" for="exampleCheck1">Lenguages</label>
                                </div>
                                <div class="col">
                                    <input type="checkbox" class="form-check-input" id="subject1"/>
                                    <label class="form-check-label" for="exampleCheck1">Social Sciences</label>
                                </div>
                        </div>
                    </div>

                    <div class="d-grip gap-2">
                        <button type="submit" class="btn btn-primary p">Submit</button>
                    </div>
                    
                    </form>
                </div>
        </div>
      );
}
 
export default CrearPreguntas;