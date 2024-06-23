const express = require('express');
const router = express.Router();
const reviewRoutes = require('./reviewRoutes');

// Mock data for demonstration purposes
const products = [
    { id: 1, name: 'Product A', price: 30 },
    { id: 2, name: 'Product B', price: 20 },
    { id: 3, name: 'Product C', price: 50 },
    { id: 4, name: 'Product D', price: 10 }
];

// GET request for listing all products with filtering and sorting
router.get('/', (req, res) => {
    let filteredProducts = products;

    // Filtering by price range
    const { minPrice, maxPrice, sortBy } = req.query;

    if (minPrice) {
        filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
    }

    // Sorting
    if (sortBy) {
        if (sortBy === 'name') {
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'price') {
            filteredProducts.sort((a, b) => a.price - b.price);
        }
    }

    res.json(filteredProducts);
});

// POST request to add a new product
router.post('/', (req, res) => {
    res.send('POST request to add a new product');
});

// PUT request to update an existing product
router.put('/:id', (req, res) => {
    res.send(`PUT request for product ${req.params.id}`);
});

// DELETE request to delete an existing product
router.delete('/:id', (req, res) => {
    res.send(`DELETE request for product ${req.params.id}`);
});

// Nested review router
router.use('/:productId/reviews', reviewRoutes);

module.exports = router;
