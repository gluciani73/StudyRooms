const { Answer, Question, User, Votesxanswer, Ratingxanswer, getRatingSum } = require('../db');
const { Op } = require("sequelize");

const createAnswer = async (req, res) => {
    try {
        const { userId,
            questionId,
            answer,
            ratingAverage,
            ratingCount,
            voteCount,
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
            answer,
            ratingAverage,
            ratingCount,
            voteCount,
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
        return res.status(500).json({ error: `Error en el controlador de answer: ${error}`, data: null })
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
                        }, 
                        
                        // include: model votesXAnswer
                    ]
                }
            );
            if (!result[0]) {
                return res.status(500).send({ error: "No se encuentran respuestas para esta pregunta", data: null })
            }
            return res.status(200).json({ error: null, data: result })
        }
    } catch (error) {
        return res.status(500).json({ error: `Error en el controlador de answer al obtener las respuestas: ${error}`, data: null })
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

        return res.status(500).json({ error: `Error en el controlador de answer al actualizar la respuesta: ${error}`, data: null })
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
        return res.status(500).json({ error: `Error en el controlador de answer al eliminar la respuesta: ${error}`, data: null })
    }
}

//votesXAnswer

const likeAnswer = async (req, res) => {
    const {userId, answerId} = req.body;
    try {

        if (!userId || !answerId) {
            return res.status(401).json({
                error: "The required fields userId and answerId are not present in the request, please add them. ",
                data: null
            })
        }

        const like = {userId, answerId, rating : true}
        const newVote = await Votesxanswer.create(like)
        const voteCountUpdated = await Votesxanswer.count({
            where: {
                answerId
            }
        });

        const answerItem = await Answer.findByPk(answerId);
        answerItem.voteCount = voteCountUpdated;
        await answerItem.save();

        return res.status(200).json({msg: 'voto creado exitosamente', error: null, newVote})
    }

    catch(error){
        return res.status(500).json({error:`Error en el controlador de answer al hacer votos: ${error}`, data: null})

    }
}



//deleteVotesXAnswer

const deleteVotesXAnswer = async (req, res) => {
    try {
        const answerId = req.params.answerId;
        if (1) {
            let result = await Votesxanswer.destroy({ where: { id: 1 } });
            if (result[0]) {
                return res.status(500).send({ error: "No se encuentra el voto", data: null })
            }
            return res.status(200).json({ error: null, data: 'Se borro el voto id: ' + answerId })
        }
    } catch (error) {
        return res.status(500).json({ error: `Error en el controlador de answer al eliminar el voto: ${error}`, data: null})
    }
}

const updateRating = async (req, res) => {
    console.log("body:", req.body)
    const {userId, answerId, rating} = req.body;
    try {

        if (!userId || !answerId || !rating) {
            return res.status(401).json({
                error: "The required fields userId, answerId and rating are not present in the request, please add them. ",
                data: null
            })
        }

        let rateItem = await Ratingxanswer.findOne({
            where: {
                userId, answerId
            }
        });

        if(!rateItem) {
            const rateNew = {userId, answerId, rating}
            await Ratingxanswer.create(rateNew)
        }

        const rateCountUpdated = await Ratingxanswer.count({
            where: {
                answerId
            }
        });

        const rateSumUpdated = await getRatingSum(answerId);
        const answerItem = await Answer.findByPk(answerId);

        answerItem.ratingCount = rateCountUpdated;
        answerItem.ratingAverage = rateSumUpdated.getDataValue('sum') / rateCountUpdated;
        await answerItem.save();

        return res.status(200).json({
                userId,
                answerId,
                ratingCount: answerItem.ratingCount,
                ratingAverage: answerItem.ratingAverage
        });
    }

    catch(error){
        return res.status(500).json({error:`Error en el controlador de answer al hacer votos: ${error}`, data: null})

    }
}

const getRatingList = async (req, res) => {
    const {questionId, userId} = req.params;
    try {

        if (!userId || !questionId) {
            return res.status(401).json({
                error: "The required fields userId and questionId are not present in the request, please add them.",
                data: null
            })
        }

        let ratingList = await queryRatingList(questionId, userId)
        return res.status(200).json(ratingList);
    }

    catch(error){
        return res.status(500).json({error:`API answerController error: ${error}`, data: null})

    }
}

function queryRatingList(questionId, userId) {
    return Answer.findAll(
        {
            where: {
                questionId
            },
            include: [
                {
                    model: Ratingxanswer,
                    where: {
                        userId
                    }
                },
            ]
        }
    );
}

module.exports = { createAnswer, updateAnswer, getAnswer, likeAnswer, deleteAnswer, deleteVotesXAnswer, updateRating, getRatingList }
