const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const userRoutes = require('./proj1/src/v1/routes/userRoutes')
const productRoutes = require('./proj2/src/v1/Routes/productRoutes')

//app.use(bodyParser.json());
app.use('/users', userRoutes);

app.use('/products',productRoutes);

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))