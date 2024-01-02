const express = require('express')
const app = express()
const PORT = 8080;
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

app.get('/home', (req, res) => {
    res.render('index')
})

app.get('/attendance', (req, res) => {
    res.render('attendance')
})

app.get('/contacts', (req, res) => {
    res.render('contacts')
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

app.get('/createyourevent', (req, res) => {
    res.render('createEvent')
})


// APIs Routing
const eventAPI = require('./routes/show-events')
app.use('/events', eventAPI)

const registerAPI = require('./routes/register-submit')
app.use('/register/submit', registerAPI)

const loginAPI = require('./routes/login-submit')
app.use('/login/submit', loginAPI)

const createEventAPI = require('./routes/create-event')
app.use('/events/create', createEventAPI)

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








