const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080;
const fadmin = require('firebase-admin');
const serviceAccountKey = require('./src/firebase/serviceAccountKey.json');

// Serve static files from the "src" directory
app.use(express.static('src'));

// Set EJS as the view engine
app.set('view engine', 'ejs')

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({extended: true}))

// Initializing Firebase 
fadmin.initializeApp({
    credential: fadmin.credential.cert(serviceAccountKey),
    storageBucket: "gs://university-events-manager.appspot.com"
});

// Views Routing
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/index', (req, res) => {
    res.render('index')
})

app.get('/home', (req, res) => {
    res.render('index')
})

app.get('/attendance', (req, res) => {
    res.render('attendance')
})

app.get('/events', (req, res) => {
    res.render('events')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('registration')
})

app.get('/report', (req, res) => {
    res.render('report')
})

app.get('/eventcreation', (req, res) => {
    res.render('createEvent')
})

app.get('/statistics', (req, res) => {
    res.render('statistics')
})

app.get('/eventedit', (req, res) => {
    res.render('editEvent')
})

// APIs Routing
const registerAPI = require('./routes/register-submit.cjs')
app.use('/register/submit', registerAPI)

const createEventAPI = require('./routes/create-event.cjs')
app.use('/events/create', createEventAPI)

const showEventAPI = require('./routes/show-events.cjs')
app.use('/events/show', showEventAPI)

const attendEventAPI = require('./routes/attend-event.cjs')
app.use('/events/attend', attendEventAPI)

const showAttEventAPI = require('./routes/show-att-events.cjs')
app.use('/att-events/show', showAttEventAPI)

const unattendEventAPI = require('./routes/unattend-event.cjs')
app.use('/events/unattend', unattendEventAPI)

const statisticsAPI = require('./routes/show-statistics.cjs')
app.use('/statistics/show', statisticsAPI)

const deleteEventAPI = require('./routes/delete-event.cjs')
app.use('/events/delete', deleteEventAPI)

const editEventAPI = require('./routes/edit-event.cjs')
app.use('/events/edit', editEventAPI)

// Error Handling if path not found
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

// Check if Server is running
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`)

})








