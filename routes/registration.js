const express = require('express');
const router = express.Router();

const fadmin = require('firebase-admin');
const credentials = require('../src/js/serviceAccountKey.json');

fadmin.initializeApp({
    credential: fadmin.credential.cert(credentials)
});

router.post('/', async (req, res, next) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    try {
        const userResponse = await fadmin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false
        });

        res.status(200).json({
            message: 'User registered successfully',
            user: userResponse
        });

    } catch (error) {
        // Handle error
        next(error); // Pass the error to the error handling middleware
    }

});

module.exports = router;



