const express = require('express')
const app = express()
//const usersRouter = require('./routes/userRoutes')
const userRouter = require('./proj1/src/v1/routes/userRouter')

app.use('/users', userRouter)

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))