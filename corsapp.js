const express = require('express')
const cors = require('cors')
const app = express()

// Enable all CORS requests
app.use(cors())

app.get('/', (req, res) => {
    res.send('CORS enabled for all origins!')
})

app.get('/data', (req, res) => {
    res.json({ message: 'This route has CORS enabled for all origins!' });
});

// Custom CORS for a specific domain
const corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.post('/update', cors(corsOptions), (req, res) => {
    res.json({ message: 'CORS enabled for only example.com' });
});

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))