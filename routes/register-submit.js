const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');

router.post('/', async (req, res, next) => {

    try {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        const userInfo = {
            firstname: req.body.fname,
            lastname: req.body.lname
        }
        // Firebase Authentication
        const userResponse = await fadmin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
        });

        res.status(200).json({
            message: 'User registered successfully'
        });

        if (res.status = 200){
            // Firebase Firestore
            const uid = userResponse.uid;
            const db = fadmin.firestore();
            const userInfoResponse = await db.collection("students").doc(uid).set(userInfo);
        }

    } catch (err) {
        // Handle error
        //console.error(err);
        res.status(500).json({
            code: err.code,
            error: err.message
        });
    }

});

module.exports = router;
