const { Answer, Question, User } = require('../db');
const { Op } = require("sequelize");

const createAnswer = async (req, res) => {
    try {
        const { userId,
            questionId,
            answer
        } = req.body;

        if (!answer || !userId || !questionId) {
            return res.status(401).json({
                error: "Falta algun dato, asegurese de enviar userId, questionId, answer",
                data: null
            })
        }
        let newAnswer = {
            userId,
            questionId,
            answer
        }

        const qAnswer = await Answer.create(newAnswer);
        const response = await Answer.findByPk(qAnswer.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'avatar', 'userName', 'email']
                }
            ]
        })
        return res.status(201).json({ error: null, data: response })
    } catch (error) {
        return res.status(500).json({ error: 'Error en el controlador de answer', data: null })
    }
}

const getAnswer = async (req, res) => {
    try {
        const questionId = req.params.questionId;
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
        const answerId = req.params.answerId;
        const { userId, answer } = req.body;

        if (!answer || !answerId || !userId) {
            return res.status(401).json({
                error: "Falta algun dato, asegurese de enviar userId, answer ",
                data: null
            })
        }
        const updateAnswer = await Answer.update({ answer }, {
            where: {
                id: answerId
            }
        })

        if (updateAnswer[0] !== 0) {
            const response = await Answer.findByPk(answerId, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'avatar', 'userName', 'email']
                    }
                ]
            });
            return res.status(200).json({ error: null, data: response })
        }
        else {
            res.status(500).json({ error: 'No se puedo editar la respuesta', data: null })
        }

    } catch (error) {

        return res.status(500).json({ error: 'Error en el controlador de answer al actualizar la respuesta', data: null })
    }
};

const deleteAnswer = async (req, res) => {
    try {
        const answerId = req.params.answerId;
        if (answerId) {
            let result = await Answer.destroy({ where: { id: answerId } });
            if (result[0]) {
                return res.status(500).send({ error: "No se encuentra la respuesta", data: null })
            }
            return res.status(200).json({ error: null, data: 'Se borro la respuesta id: ' + answerId })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error en el controlador de answer al eliminar la respuesta', data: null })
    }
}


module.exports = { createAnswer, updateAnswer, getAnswer, deleteAnswer }