const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');

router.post('/', async (req, res, next) => {

    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        const fullname = req.body.fname + ' ' + req.body.lname;

        // Firebase Authentication
        const userResponse = await fadmin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
        });

        res.status(200).json({
            message: 'User registered successfully'
        });

        // Add user information to Firestore
        if (res.status = 200){
            // Firebase Firestore
            const uid = userResponse.uid;
            const db = fadmin.firestore();

            // Get the current date and time
        const currentDate = new Date();
        const dateString = currentDate.toISOString();
        const yearMonthDate = dateString.substring(0, 10);

            await db.collection("students").doc(uid).set({
                fullname,
                registrationDate: yearMonthDate,
            });
        }

    } catch (err) {
        // Handle error
        console.error(err);
        res.status(500).json({
            code: err.code,
            error: err.message
        });
    }

});

module.exports = router;
