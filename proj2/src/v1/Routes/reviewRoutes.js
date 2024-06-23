const express = require('express')
const router = express.Router({ mergeParams: true })


// Route to get all posts for a user
router.get('/', (req, res) => {
    res.send(`List of reviews for product ${req.params.productId}`)
})

// Route to get a specific post
router.get('/:reviewId', (req, res) => {
    res.send(`Details of reviews ${req.params.reviewId} for product ${req.params.productId}`)
})

// POST request to add a new product
router.post('/', (req, res) => {
    res.send('POST request to add a new review');
});


// DELETE request to delete an existing product
router.delete('/:reviewId', (req, res) => {
    res.send(`DELETE request for review ${req.params.reviewId}`);
});
module.exports = router