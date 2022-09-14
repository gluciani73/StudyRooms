const { Router } = require('express');
const router = Router();
const { Answer, Question, User } = require('../db');

const mockData = async () => {
    let newUser = {         // creo un usuario admin de prueba
        userName: "admin",
        authType: "authtype???",
        firstName: "Admin Firstname",
        lastName: "Admin Lastname",
        email: "email.admin@studyrooms.com",
        hashedPassword: "xxxxxxx",
        avatar: "",
        admin: true,
        premium: true,
        active: true
    }

    const adminUser = await User.create(newUser);
}

mockData();


// ---------------------- POST /answer ---------------------------
router.post('/answer', async (req, res) => {
    try {
        console.log(req.body) // .log('-------POST /answer -------------- ')
        const { userId, questionId, title, answer } = req.body;

        // console.log('Posteo Answer');
        if (!answer) {
            return res.status(401).send("no hay datos")
        }
        let newAnswer = {         // creo nuevo objetos con datos de la answer pasada x body
            userId,
            questionId,
            title,
            answer
        }

        const qAnswer = await Answer.create(newAnswer);

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

module.exports = router;
