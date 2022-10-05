const {Comment, User} = require('../db');

const getCommentListByQuestionId = async (req, res) => {
    const questionId = req.params.questionId;
    try {
        const result = await Comment.findAll(
            {
                where: {
                    questionId
                },
                include: [
                    {
                        model: User,
                        attributes: ['id', 'avatar', 'userName', 'email', 'isPremium']
                    }
                ]
            }
        );
        if(!result[0]) {
            return res.status(200).send({ //if there is no comments, it returns an empty array.
                          error: null,
                          data: [] })
        }
        return res.status(200).json({ error: null, data: result })
    }
    catch (error) {
        return res.status(500).json({
                      error: `There was an error retrieving the comment list for question ${questionId}: ${error}`,
                      data: null
                  });
    }
}

const createComment = async (req, res) => {
    const {userId, questionId, comment} = req.body;
    if (!comment || !userId || !questionId) {
        return res.status(401).json({
            error: "There is a missing field, please verify userId, questionId and comment fields are present",
            data: null
        });
    }
    try {
        const commentInfo = {userId, questionId, comment};
        const commentCreated = await Comment.create(commentInfo);
        const commentResponse = await Comment.findByPk(commentCreated.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'avatar', 'userName', 'email']
                }
            ]
        });

        return res.status(201).json({
            error: null,
            data: commentResponse
        });
    }
    catch (error) {
        return res.status(500).json({
            error: `There was an error creating the comment: ${error}`,
            data: null
        });
    }
}

const updateComment = async (req, res) => {
    const {userId, questionId, comment} = req.body;
    if (!userId || !questionId || !comment) {
        return res.status(401).json({
            error: "There is a missing field, please verify userId, questionId and comment fields are present",
            data: null
        });
    }
    try {
        const commentId = req.params.commentId;
        const commentInfo = {userId, questionId, comment};
        const commentUpdated = await Comment.update(commentInfo, {
            where: {
                id: commentId
            }
        });

        if (commentUpdated[0] !== 0) {
            const response = await Comment.findByPk(commentId, {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'avatar', 'userName', 'email']
                    }
                ]
            });
            res.json({
                error: null,
                data: response
            });
        } else {
            res.status(500).json({
                error: 'There was an error updating the comment.',
                data: null
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            error: `There was an error updating the comment: ${error}`,
            data: null
        });
    }
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        const commentDeleted = await Comment.destroy({
            where: {
                id: commentId
            }
        });
        if (commentDeleted === 1) {
            res.json({
                error: null,
                data: {
                    commentId,
                    message: "The comment was deleted with success."
                }
            });
        } else {
            res.status(500).json({
                error: 'The request comment does not exist.',
                data: null
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            error: `There was an error deleting the comment: ${error}`,
            data: null
        });
    }
}

module.exports = {createComment, getCommentListByQuestionId, updateComment, deleteComment};