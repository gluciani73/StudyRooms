const { Answer, Question, User } = require('../db');
const { Op } = require("sequelize");

const createAnswer = async (req, res) => {
    try {
        const { userId,
            questionId,
            answer,
            rating } = req.body;

        if (!answer || !userId || !questionId || !rating) {
            return res.status(401).json({
                error: "Falta algun dato, asegurese de enviar userId, questionId, answer, rating",
                data: null
            })
        }
        let newAnswer = {
            userId,
            questionId,
            answer,
            rating
        }

        const qAnswer = await Answer.create(newAnswer);

        return res.status(201).json({ error: null, data: qAnswer })

    } catch (error) {
        return res.status(500).json({ error: 'Error en el controlador de answer', data: null })
    }
}

const getAnswer = async (req, res) => {
    try {
        const questionId = req.params.id;
        if (questionId) {
            let result = await Answer.findAll(
                {
                    where: {
                        questionId
                    },
                    include: [
                        {
                            model: Question
                        },
                        {
                            model: User,
                            attributes: ['id', 'avatar', 'userName', 'email']
                        }
                    ]
                }
            );
            if (!result[0]) {
                return res.status(500).send({ error: "No se encuentran respuestas para esta pregunta", data: null })
            }
            return res.status(200).json({ error: null, data: result })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error en el controlador de answer al obtener las respuestas', data: null })
    }
}


const updateAnswer = async (req, res, next) => {
    try {
        const dataAnswer = req.body;
        const { id } = req.params;

        const updateAnswer = await Answer.update(dataAnswer, {
            where: {
                id
            }
        })

        if(updateAnswer[0] !== 0) {
            const response = await Answer.findByPk(id, {
                include: [
                    {
                        model: User,
                        attributes:['id', 'avatar', 'userName', 'email']
                    }
                ]
            });
            res.json(response);
        }
        else {
            res.status(500).json({error: 'No se puedo editar la respuesta', data: null})
        }

    } catch (error) {
        // next(error)
        return res.status(500).json({ error: 'Error en el controlador de answer al actualizar la respuesta', data: null })
    }
};


module.exports = { createAnswer, updateAnswer, getAnswer }