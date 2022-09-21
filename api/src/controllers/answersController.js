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
                error: "Falta algun dato, asegurese de enviar userId, questionId, answer, rating",
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

// en revision el UPDATE
const updateAnswer = async (req, res, next) => {
    try {
        const dataAnswer = req.body;
        const answerId = req.params.answerId;


        // ACA FALTA CONTROLAR QUE EL USUARIO QUE HACE UPDATE ES EL QUE ESTA LOGGEADO
        // const userOk = await Answer.findByPk(id, {
        //     include: [{
        //         model: User, attributes: ['id', 'avatar', 'userName', 'email']
        //     }]
        // });
        // console.log('userOk.userId: ', userOk.userId)
        // // if (dataAnswer.userId === userId) {

        // // }
        const updateAnswer = await Answer.update(dataAnswer, {
            where: {
                id: answerId
            }
        })
        // console.log(updateAnswer)
        if (updateAnswer[0] !== 0) {
            console.log(updateAnswer[0])
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