const { Question, Category, User } = require('../db.js');

const getQuestions = async (req, res) => {
    const allQuestions = await Question.findAll({ include: Category })
    //filtro para el front que trae todas las Questions
    const filterQ = allQuestions.map(e => e.userId.toLowerCase())
    const total = filterQ.filter((item, index) => {
        return filterQ.indexOf(item) === index;
    })

    return res.json(total)
}

const createQuestion = async (req, res, next) => {
    const {
        userId,
        title,
        description,
        categories
    } = req.body;

    try {
        let newQuestion = await Question.create({
            userId, title, description, ratingAverage: 0, ratingCount: 0, voteCount: 0, isFeatured: false
        })
        // console.log(newQuestion);

        categories.forEach(async (c) => {
            const category = await Category.findOne({ where: { category: c } }); // 
            if (category) { await newQuestion.addCategory(category) };           // 
        });

        return res.json(newQuestion)
    } catch (error) {
        next(error)
    }
}

module.exports = { getQuestions, createQuestion }