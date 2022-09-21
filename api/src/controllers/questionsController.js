const { Question, Category, User } = require('../db.js');

const getQuestions = async (req, res) => {
    const allQuestions = await Question.findAll()
    //filtro para el front que trae todas las Questions
    /* const filterQ = allQuestions.map(e => e.userId.toLowerCase())
    const total = filterQ.filter((item, index) => {
        return filterQ.indexOf(item) === index;
    }) */

    return res.json(allQuestions)
}

const createQuestion = async (req, res, next) => {
    const {
        userId,
        title,
        description,
        categories
    } = req.body;

    if(!userId || !title || !description || !categories){
        return res.status(401).json({error:"faltan datos", data: null})
    }

    try {

        let newQuestion = await Question.create({
            userId, title, description, ratingAverage: 0, ratingCount: 0, voteCount: 0, isFeatured: false
        })

        categories.forEach(async (c) => {
            const category = await Category.findOne({ where: { category: c } }); // 
            if (category) { await newQuestion.addCategory(category) };           // 
        });

        return res.json(newQuestion)
    } catch (error) {
        console.log(error.message);
        //next(error)
    }
}


const questionId = async (req, res) => {
    const id = req.params.id;
    const questionsFull = await Question.findAll()
    let QID = await questionsFull.filter (e => e.id==(id))
        
    return QID.length ?
    res.status(200).json(QID) :    
    res.status(404).send('La pregunta no existe');
       
    }



module.exports = { getQuestions, createQuestion, questionId }