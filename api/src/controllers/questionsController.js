const { Question, Category, User, Answer, Review, Votesxquestion } = require('../db.js');
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
                            model: Votesxquestion
                        },
                        {
                            model: Answer
                        },
                        {
                            model: Category
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
                { model: Category },
                {model: Votesxquestion},
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
    try {
        const questionId = req.params.questionId;
        const { userId,
            title,
            description,
            categories
        } = req.body;

        if (!title || !questionId || !userId || !description || !categories) {
            return res.status(401).json({
                error: "Falta algun dato",
                data: null
            })
        }
        const updateQuestion = await Question.update({ title, description }, {
            where: {
                id: questionId
            }
        });

        // categories.forEach(async (c) => {
        //     const category = await Category.findOne({ where: { category: c } }); // 
        //     if (category) { await updateQuestion.addCategory(category) };           // 
        // });

        if (updateQuestion[0] !== 0) {
            const response = await Question.findByPk(questionId, {
                include: [
                    { model: Category },
                    {
                        model: User,
                        attributes: ['id', 'avatar', 'userName', 'email']
                    }
                ]
            });

            return res.status(200).json({ error: null, data: response })
        }
        else {
            res.status(500).json({ error: 'No se puedo editar la pregunta', data: null })
        }
    } catch (error) {

        return res.status(500).json({ error: 'Error en el controlador de quetion al actualizar la pregunta', data: null })
    }
}


const deleteQuestion = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        if (questionId) {
            let result = await Question.destroy({ where: { id: questionId } });
            if (result[0]) {
                return res.status(500).send({ error: "No se encuentra la pregunta", data: null })
            }
            return res.status(200).json({ error: null, data: 'Se borro la pregunta id: ' + questionId })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error en el controlador de question al eliminar la pregunta', data: null })
    }
}


//reviewQuestion

const viewQuestion = async (req, res) => {
    const {userId, questionId} = req.body;
    try {
        
        const view = {userId, questionId, rating : true}
        const newView = await Review.create(view)
        
        return res.status(200).json({msg: 'visto exitosamente', error: null, newView})
    }

    catch(error){
        return res.status(500).json({error:`Error en  reviewQuestion: ${error}`, data: null})
    }
}

const likeQuestion = async (req, res) => {
    const {userId, questionId} = req.body;
    try {
        
        const like = {userId, questionId, rating : true}
        const newVote = await Votesxquestion.create(like)
        
        return res.status(200).json({msg: 'voto creado exitosamente', error: null, newVote})
    }

    catch(error){
        return res.status(500).json({error:`Error en el controlador de answer al hacer votos: ${error}`, data: null})

    }
}



const unlikeQuestion = async (req, res) => {
    try {
        const questionId = parseInt(req.params.questionId)    //req.params.questionId;
        const {userId} = req.query;
        
        const vote = await Votesxquestion.findOne({where: { questionId: questionId, userId: userId}})
    
        vote.destroy();
        return res.status(200).json({ error: null, data: 'Se borro el voto id: ' })
    } catch (error) {
        
        return res.status(500).json({ error: `Error en el controlador de answer al eliminar el voto: ${error}`, data: null})
    }
}

const getQuestionsByUser = async (req,res) => {
    try {
        
        const {userId} = req.params
        const questionList = await Question.findAll({where:{userId}})

        if(!questionList.length) return res.status(404).json({data:[], error: "no se encontraron preguntas para ese userId"})

        // el ratingCount viene en tipo string (!!! si no anda checkear esto)
        const sortedList = questionList.sort((a, b) => parseFloat(b.ratingAverage)-parseFloat(a.ratingAverage))

        return res.status(200).json({data:sortedList, error:null})

    } catch (error) {
        return res.status(500).json({data:null, errror :"error en el questionsController"})
    }
}




module.exports = { createQuestion, updateQuestion, getQuestions, getQuestion, deleteQuestion, viewQuestion, likeQuestion, unlikeQuestion, getQuestionsByUser }