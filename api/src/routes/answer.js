const { Router } = require('express');
const router = Router();
const { createAnswer,
        getAnswer,
        updateAnswer,
        likeAnswer,
        deleteVotesXAnswer,
        deleteAnswer,
        updateRating,
        getRatingList,
        getVotingList,
} = require('../controllers/answersController.js')


// /asnwers/...
router.post('/', createAnswer);
router.get('/:questionId', getAnswer);
router.put('/:answerId', updateAnswer);
router.delete('/:answerId', deleteAnswer);
router.post('/vote/:answerId', likeAnswer)
router.delete('/:answerId/vote/:userId', deleteVotesXAnswer)
router.put('/rating/:answerId', updateRating)
router.get('/:questionId/rating/:userId', getRatingList)
router.get('/:questionId/voting/:userId', getVotingList)

module.exports = router;
