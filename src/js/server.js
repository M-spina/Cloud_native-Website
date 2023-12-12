const express = require('express');
const fadmin = require('firebase-admin');
const credentials = require('./serviceAccountKey.json');
const app = express();
const PORT = 8080;

fadmin.initializeApp({
    credential: fadmin.credential.cert(credentials)
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`)

})

app.post('/registration', async (req, res) => {

    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    const userResponse = await fadmin.auth().createUser({
        email: user.email,
        password: user.password,
        emailVerified: false,
        disabled: false
    })

    res.json(userResponse); 

});