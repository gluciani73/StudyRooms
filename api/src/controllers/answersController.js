const { Answer, Question, User } = require('../db');

const createAnswer = async (req, res) => {
    try {
        // console.log(req.body) // .log('-------POST /answer -------------- ')
        const { userId, questionId, answer, rating } = req.body;

        // console.log('Posteo Answer');
        if (!answer || !userId || !questionId || !rating) {
            return res.status(401).json({
                error: "Falta algun dato, asegurese de enviar userId, questionId, answer, rating",
                data: null
            })
        }
        let newAnswer = {    // creo nuevo objetos con datos de la answer pasada x body
            userId,
            questionId,
            answer,
            rating
        }

        const qAnswer = await Answer.create(newAnswer);
        // let msg = `Se creo la respuesta ${qAnswer.id}.`
        return res
            .status(201)
            .json({ error: null, data: qAnswer })
    } catch (error) {
        // console.log(error)
        return res.status(500).json({ error: 'Error en el controlador de answer', data: null })
    }
}

module.exports = { createAnswer }