const { Question, Category, User, Answer } = require('../db.js');
const { Op } = require('sequelize');

const createQuestion = async (req, res, next) => {
    try {
        const {
            userId,
            title,
            description,
            categories
        } = req.body;

        if (!userId || !title || !description || !categories) {
            return res.status(401).json({ error: "faltan datos", data: null })
        }

        let newQuestion = await Question.create({
            userId, title, description, ratingAverage: 0, ratingCount: 0, voteCount: 0, isFeatured: false
        })

        categories.forEach(async (c) => {
            const category = await Category.findOne({ where: { category: c } }); // 
            if (category) { await newQuestion.addCategory(category) };           // 
        });

        return res.status(201).json({ error: null, data: newQuestion })

    } catch (error) {
        return res.status(500).json({ error: 'Error en el controlador de create question', data: null })
    }
}

const getQuestion = async (req, res) => {
    try {
        const { questionId } = req.params;
        if (questionId) {
            let result = await Question.findAll(
                {
                    where: {
                        id: questionId
                    },
                    include: [
                        {
                            model: Answer
                        },
                        {
                            model: User,
                            attributes: ['id', 'avatar', 'userName', 'email']
                        }
                    ]
                }
            );
            if (!result[0]) {
                return res.status(500).send({ error: "No se encuentran preguntas para estos datos", data: null })
            }
            return res.status(200).json({ error: null, data: result })
        }

    } catch (error) {
        return res.status(500).json({ error: 'Error en el controlador de questions al obtener las preguntas', data: null })
    }
}

const getQuestions = async (req, res) => {
    try {
        let result = await Question.findAll({
            include: [
                { model: Answer },
                {
                    model: User,
                    attributes: ['id', 'avatar', 'userName', 'email']
                }]
        });
        return res.status(200).json({ error: null, data: result })
    } catch (error) {
        return res.status(500).json({ error: 'Error en el controlador de questions al obtener las preguntas', data: null })
    }
}


const updateQuestion = async (req, res) => {

}

module.exports = { createQuestion, updateQuestion, getQuestions, getQuestion }