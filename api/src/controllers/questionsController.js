const { Question, Category } = require('../db.js');

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
        Category
    } = req.body;

    try {
        let Question = await Question.create({ userId, title, description, Category })
        await Question.setQuestions(Question)

        let QuestionWithCategory = await Question.findOne({
            where: { userId: userId },
            attributes: {
                exclude: ['updatedAt', 'createdAt'],
            },
            include: {
                model: Category,
                through: {
                    attributes: []
                }
            }
        })
        return res.json(QuestionWithCategory)
    } catch (error) {
        next(error)
    }
}

module.exports = {getQuestions, createQuestion}