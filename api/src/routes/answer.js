const { Router } = require('express');
const router = Router();
const { Answer, Question } = require('../db');


// ---------------------- POST /answer ---------------------------
router.post('/answer', async (req, res) => {
    try {
        // console.log('-------POST /answer -------------- ')
        const { questionId, title, answer } = req.body;

        // console.log('Posteo Answer');
        if (!answer) {
            return res.status(401).send("no hay datos")
        }
        let newAnswer = {         // creo nuevo objetos con datos de la answer pasada x body
            questionId,
            title,
            answer
        }

        const qAnswer = await Answer.Create({
            where: newAnswer
        });

        const question = await Question.findOne({ where: { id: questionId } }); // busco pregunta
        if (question) { await answer.addQuestion(qAnswer) };            // y le agrego la answer pasada
        let msg = `Se creo la respuesta ${answer.id}.`
        return res
            .status(201)
            .send(msg)
    } catch (error) {
        console.log(error)
    }
});
