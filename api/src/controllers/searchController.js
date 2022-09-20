const { Question, Answer, Category } = require('../db.js');
const { Op } = require('sequelize')

const searchQuestion = async (req, res) => {
    const { string } = req.query;
    try {
        if (string) {
            //ver https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#operators
            // ver https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#examples-with-opand-and-opor
            let resultQuestion = await Question.findAll({
                where: {
                    [Op.or]: [
                        {
                            title: {
                                [Op.iLike]: `%${string}%`,
                            }
                        },
                        {
                            description: {
                                [Op.iLike]: `%${string}%`,
                            }
                        }
                    ]
                },
                include: [
                    { model: Category },
                    { model: Answer }
                ]
            }
            );

            if (!resultQuestion.length) {
                return res
                    .status(404)
                    .json({ error: "No se encuentran preguntas para la busqueda", data: [] })
            }
            return res.status(200).json({ error: null, data: resultQuestion })
        }
        return res.status(200).json({ error: null, data: "No ha ingresado texto de busqueda" })
    } catch (error) {
        // console.log('El error es: ', error)
        return res.status(500).json({ error: "falla el searchQuestion ", data: null })
    }
}

const searchAnswer = async (req, res) => {
    const { string } = req.query;
    try {
        if (string) {
            let resultAnswer = await Answer.findAll({
                where: {
                    answer: {
                        [Op.iLike]: `%${string}%`,
                    },
                },
                include: {
                    model: Question
                }
            }
            );

            if (!resultAnswer.length) {
                return res
                    .status(200)
                    .send({ error: "No se encuentran respuestas para la busqueda", data: [] })
            }
            return res.status(200).json({ error: null, data: resultAnswer })
        }
        return res.status(200).json({ error: null, data: "No ha ingresado texto de busqueda" })
    } catch (error) {
        return res.status(500).json({ error: "falla el searchQuestion ", data: null })
    }
}

const searchQA = async (req, res) => {
    const { string } = req.query;
    try {
        if (string) {
            let resultQuestion = await Question.findAll({
                where: {
                    [Op.or]: [
                        {
                            title: {
                                [Op.iLike]: `%${string}%`,
                            }
                        },
                        {
                            description: {
                                [Op.iLike]: `%${string}%`,
                            }
                        }
                    ]
                },
                include: [
                    { model: Category },
                    { model: Answer }
                ]
            }
            );
            let resultAnswer = await Answer.findAll({
                where: {
                    answer: {
                        [Op.iLike]: `%${string}%`,
                    },
                },
                include: {
                    model: Question
                }
            }
            );
            if (!resultQuestion.length && !resultAnswer.length) {
                return res
                    .status(404)
                    .json({ error: "No se encuentran resultdos para la busqueda", data: [] })
            }
            let result = { questions: resultQuestion, answers: resultAnswer }
            return res.status(200).json({ error: null, data: result })
        }
        return res.status(200).json({ error: null, data: "No ha ingresado texto de busqueda" })
    } catch (error) {
        return res.status(500).json({ error: "error en searchQA ", data: null })
    }
}

// WORK FINISHED ... ---  SEARCH Categories.... --------

const searchCategory = async (req, res) => {
    const { category } = req.query;
    try {
        if (category) {
            let resultCategory = await Question.findAll({
                include: [
                    { model: Category },
                    { model: Answer }
                ]
            }
            );
            if (!resultCategory.length) {
                return res
                    .status(404)
                    .json({ error: "No se encuentran resultdos para la busqueda", data: [] })
            }
            let result = resultCategory.filter((q) =>
                q.categories.map((qcat) => qcat.category).includes(category));
            return res.status(200).json({ error: null, data: result })
        }
        return res.status(200).json({ error: null, data: "No ha ingresado texto de busqueda" })
    } catch (error) {
        return res.status(500).json({ error: "error en searchCategory ", data: null })
    }
}

module.exports = { searchQuestion, searchAnswer, searchQA, searchCategory }