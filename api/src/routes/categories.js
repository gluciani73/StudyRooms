const { Router } = require('express');
const { Category, Question } = require('../db');
const router = Router();

router.get('/Category', async (req, res) => {
    const { userId } = req.query
    const allCategories = await Category.findAll({
        include: Question
    })

    if (userId) {
        const byUserId = await allCategories.filter(i => i.userId.toLowerCase().startsWith(userId.toLowerCase()))
        byUserId.length ?
            res.json(byUserId) :
            res.status(404).send({ 'msg': 'Not found' })
    } else {
        res.json(allCategories)
    }
});

router.get('/Category:id', async (req, res, next) => {
    const { id } = req.params;
    let categories

    try {
        if (id.length > 1) {
            categories = await Category.findByPk(id, { include: Question })

            categories = {
                id: categories.id,
                questions: categories.questions.map((e) => {
                    return {
                        id: e.id,
                        userId: e.userId,
                        title: e.title,
                        description: e.description,
                        Category: e.Category
                    }
                })
            }
        }
        res.json(categories)
    } catch (error) {
        next(error)
    }
});

module.exports = router;