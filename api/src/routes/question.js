const { Router } = require('express');
const { Question, Category } = require('../db');

const router = Router();

router.get('/Question', async (req, res) => {
    const allQuestions = await Question.findAll({ include: Category })
    //filtro para el front que trae todas las Questions
    const filterQ = allQuestions.map(e => e.userId.toLowerCase())
    const total = filterQ.filter((item, index) => {
        return filterQ.indexOf(item) === index;
    })
    res.json(total)
});


router.post('/Question', async (req, res, next) => {

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
        res.json(QuestionWithCategory)
    } catch (error) {
        next(error)
    }

});

module.exports = router;