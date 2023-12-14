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
        password: req.body.password
    }
    const userInfo = {
        firstname: req.body.fname,
        lastname: req.body.lname
    }
    //console.log(user)
    //console.log(userInfo)
    try {
        // Firebase Authentication
        const userResponse = await fadmin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false
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
            error: err.message
        });
    }

});

module.exports = router;
