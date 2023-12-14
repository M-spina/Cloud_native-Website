const express = require('express')
const app = express()
const PORT = 8080;
//const bodyParser = require('body-parser')

// Serve static files from the "src" directory
app.use(express.static('src'));
// Set EJS as the view engine
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Render views
app.get('/', (req, res) => {
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

// Routes
const eventRoute = require('./routes/events')
app.use('/events', eventRoute)

const registrationRoute = require('./routes/registration')
app.use('/registration/submit', registrationRoute)

// Check if Server is running
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)

})








