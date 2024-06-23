const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors');


app.use(express.json());
app.use(cors());

let events = [
    { id: 1, name: 'Music Concert', date: '2024-07-10', location: 'Stadium' },
    { id: 2, name: 'Art Exhibition', date: '2024-08-05', location: 'Art Gallery' },
    { id: 3, name: 'Tech Conference', date: '2024-09-20', location: 'Convention Center' }
];

function isValidDateFormat(dateString)
{
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormat.test(dateString) && !isNaN(Date.parse(dateString));
}


app.get('/events', (req, res) => {

    let filteredEvents = events;
    const { name, date, page = 1, size = 2 } = req.query;

    if (name) {
        filteredEvents = filteredEvents.filter(event => event.name.toLowerCase() === name.toLowerCase());
    }

    if (date) {
        filteredEvents = filteredEvents.filter(event => event.date === date);
    }
//Pagination
    const pageNum = parseInt(page);
    const pageSize = parseInt(size);
    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);


    res.status(200).json({
        totalItems: filteredEvents.length,
        totalPages: Math.ceil(filteredEvents.length / pageSize),
        currentPage: pageNum,
        events: paginatedEvents
    });
});

app.get('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const event = events.find(e => e.id === eventId);
    if (event) {
        res.status(200).json(event);
    } else {
        res.status(404).send({ error: 'Event not found' });
    }
});

app.post('/events', (req, res) => {
    const { name, date, location } = req.body;
    if (!name || !date|| !location) {
        return res.status(400).send({ error: 'name,date and location are required' });
    }
    if (!isValidDateFormat(date)) {
        return res.status(400).send({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
    }
    const newEvent = {
        id: events.length + 1,
        name,
        date,
        location
    };
    events.push(newEvent);
    res.status(201).send(newEvent);
});

app.put('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const { name, date, location } = req.body;
    if (!name || !date|| !location) {
        return res.status(400).send({ error: 'name,date and location are required' });
    }
    if (!isValidDateFormat(date)) {
        return res.status(400).send({ error: 'Invalid date format. Please use YYYY-MM-DD.' });
    }
    const event = events.find(e => e.id === eventId);
    if (!event) {
        return res.status(404).send({ error: 'Event not found' });
    }
    if (event) {
        event.name = name || event.name;
        event.date = date || event.date;
        event.location = location || event.location;
        res.status(200).send(event);
    } else {
        res.status(404).send({ error: 'Event not found' });
    }
});

app.delete('/events/:id', (req, res) => {
    const eventId = parseInt(req.params.id);
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
        res.send({ message: 'Event deleted' });
    } else {
        res.status(404).send({ error: 'Event not found' });
    }
});


const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))