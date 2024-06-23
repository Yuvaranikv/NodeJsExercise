const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors');


app.use(express.json());
app.use(cors());

let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
]

app.get('/books', (req, res) => {
    res.status(200).json(books)
})

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book) res.status(404).send('The book was not found')
    res.status(200).json(book)
})


app.post('/books', (req, res) => {
    const { title, author } = req.body
    if (!title || !author) {
        return res.status(400).send({ error: 'Title and author are required' });
    }
    const book = {
        id: books.length + 1,
        title,
        author
    }
    books.push(book)
    res.status(201).send(book)
})

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id))
    if (!book) res.status(404).send('The book was not found')

    const { title, author } = req.body
    book.title = title
    book.author = author
    res.status(200).send(book)
})

app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id))
    if (index === -1) res.status(404).send('The book was not found')

    books.splice(index, 1)
    res.status(204).send()
})


const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))