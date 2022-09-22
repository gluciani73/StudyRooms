const { Router } = require('express');
const router = Router();
const {createComment, getCommentListByQuestionId, updateComment, deleteComment} = require("../controllers/commentsController");

router.get('/:questionId', getCommentListByQuestionId);
router.post('/', createComment);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

module.exports = router;