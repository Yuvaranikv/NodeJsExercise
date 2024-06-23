const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    res.send(`List of comments for Post ${req.params.postId}`);
});

router.get('/:commentId', (req, res) => {
    res.send(`Details of Comment ${req.params.commentId} for Post ${req.params.postId}`);
});

module.exports = router;
