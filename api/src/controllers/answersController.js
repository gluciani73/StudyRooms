const { Answer, Question, User, Votesxanswer, Ratingxanswer} = require('../db');
const { Op, Sequelize } = require("sequelize");
const sendMail = require('./mailer.js')

const getRatingSum = async (answerId) => await Ratingxanswer.findOne({
    where: {
        answerId
    },
    attributes: [
        'answerId',
        [Sequelize.fn('sum', Sequelize.col('rating')), 'sum'],
    ],
    group: ['answerId']
});

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



        // correo: respondiendo una pregunta
        const dataQuestion = await Question.findByPk(questionId, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'avatar', 'userName', 'email']
                }
            ]
        }
        )

        const mailQuestion = {
            from: "study.rooms.mail@gmail.com",
            to: dataQuestion.user.email,
            subject: "Alguien Respondio Tu Pregunta",
            text: answer
        }
        if (dataQuestion.user.id > 5) {
            await sendMail(mailQuestion)
        }
        // console.log(dataQuestion.user.email)


        return res.status(201).json({ error: null, data: response })
    } catch (error) {
        return res.status(500).json({ error: `Error en el controlador de answer: ${error}`, data: null })
    }
}

// 

const getAnswer = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (questionId) {
            let result = await Answer.findAll(
                {
                    where: {
                        questionId,
                        isDeleted: false
                    },
                    include: [
                        {
                            model: Question
                        },
                        {
                            model: User,
                            attributes: ['id', 'avatar', 'userName', 'email', 'isPremium']
                        },

                        // include: model votesXAnswer
                    ]
                }
            );
            if (!result[0]) {
                return res.status(200).json({ error: "No se encuentran respuestas para esta pregunta", data: [] })
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
        /* const answerId = req.params.answerId;
        if (answerId) {
            let result = await Answer.destroy({ where: { id: answerId } });
            if (result[0]) {
                return res.status(500).send({ error: "No se encuentra la respuesta", data: null })
            }
            return res.status(200).json({ error: null, data: 'Se borro la respuesta id: ' + answerId })
        } */
        const answerExists = await Answer.findByPk(parseInt(req.params.answerId))
        if (answerExists) {
            await Answer.update({ isDeleted: true }, { where: { id: parseInt(req.params.answerId) } })
            return res.status(200).json({ error: null, data: 'Se borro la respuesta id: ' + req.params.answerId })
        }
        else {
            return res.status(404).send({ error: "No se encuentra la respuesta", data: null })
        }


    } catch (error) {
        return res.status(500).json({ error: `Error en el controlador de answer al eliminar la respuesta: ${error}`, data: null })
    }
}

const likeAnswer = async (req, res) => {
    const { userId, answerId } = req.body;
    try {

        if (!userId || !answerId) {
            return res.status(401).json({
                error: "The required fields userId and answerId are not present in the request, please add them. ",
                data: null
            })
        }

        let voteItem = await Votesxanswer.findOne({
            where: {
                userId, answerId
            }
        });

        if (!voteItem) {
            const voteNew = { userId, answerId, rating: true }
            voteItem = await Votesxanswer.create(voteNew)
        }

        const voteCountUpdated = await Votesxanswer.count({
            where: {
                answerId
            }
        });

        const answerItem = await Answer.findByPk(answerId);
        answerItem.voteCount = voteCountUpdated;
        await answerItem.save();

        let votingList = await queryVotingList(answerItem.questionId, userId)
        return res.status(200).json({
            msg: 'voto creado exitosamente',
            error: null,
            voteItem,
            votingList
        })
    }

    catch (error) {
        return res.status(500).json({ error: `Error en el controlador de answer al hacer votos: ${error}`, data: null })

    }
}

const deleteVotesXAnswer = async (req, res) => {
    try {
        const { answerId, userId } = req.params;

        if (!answerId || !userId) {
            return res.status(401).json({
                error: "The required fields userId and answerId are not present in the request, please add them. ",
                data: null
            })
        }

        let result = await Votesxanswer.destroy({ where: { userId, answerId } });
        if (result === 0) {
            return res.status(500).send({ error: "No se encuentra el voto", data: null })
        }
        const answerItem = await Answer.findByPk(answerId)
        let votingList = await queryVotingList(answerItem.questionId, userId)
        return res.status(200).json({
            error: null,
            message: `The vote with answerId:${answerId} and userId:${userId} was deleted`,
            votingList
        });

    } catch (error) {
        return res.status(500).json({ error: `Error en el controlador de answer al eliminar el voto: ${error}`, data: null })
    }
}

const updateRating = async (req, res) => {
    const { userId, questionId, answerId, rating } = req.body;
    try {

        if (!userId || !questionId || !answerId || !rating) {
            return res.status(401).json({
                error: "The required fields userId, questionId, answerId and rating are not present in the request, please add them. ",
                data: null
            })
        }

        let rateItem = await Ratingxanswer.findOne({
            where: {
                userId, answerId
            }
        });

        if (!rateItem) {
            const rateNew = { userId, answerId, rating }
            await Ratingxanswer.create(rateNew)
        }
        else {
            rateItem.rating = rating;
            rateItem.save();
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

        let ratingList = await queryRatingList(questionId, userId)

        return res.status(200).json({
            answerItem: {
                userId,
                answerId,
                ratingCount: answerItem.ratingCount,
                ratingAverage: answerItem.ratingAverage
            },
            ratingList
        });
    }

    catch (error) {
        return res.status(500).json({ error: `Error en el controlador de answer al hacer votos: ${error}`, data: null })

    }
}

const getRatingList = async (req, res) => {
    const { questionId, userId } = req.params;
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

    catch (error) {
        return res.status(500).json({ error: `API answerController error: ${error}`, data: null })

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

const getVotingList = async (req, res) => {
    const { questionId, userId } = req.params;
    try {

        if (!userId || !questionId) {
            return res.status(401).json({
                error: "The required fields userId and questionId are not present in the request, please add them.",
                data: null
            })
        }

        let votingList = await queryVotingList(questionId, userId)
        return res.status(200).json(votingList);
    }

    catch (error) {
        return res.status(500).json({ error: `API answerController error: ${error}`, data: null })
    }
}

function queryVotingList(questionId, userId) {
    return Answer.findAll(
        {
            where: {
                questionId
            },
            include: [
                {
                    model: Votesxanswer,
                    where: {
                        userId
                    }
                },
            ]
        }
    );
}

module.exports = { createAnswer, updateAnswer, getAnswer, likeAnswer, deleteAnswer, deleteVotesXAnswer, updateRating, getRatingList, getVotingList }
