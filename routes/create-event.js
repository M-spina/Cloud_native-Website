const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');

router.post('/', async (req, res, next) => {
    // Get the ID token from the request header
    //const idToken = req.headers.authorization;

    // Verify the ID token and get the UID
    //const decodedToken = await fadmin.auth().verifyIdToken(idToken);
    //const uid = decodedToken.uid;

    const event = {
        name: req.body.name,
        location: req.body.location,
        date: req.body.date,
        description: req.body.description,
        imgFile: req.body.imgFile,
        //createdBy: uid
    }
    console.log(event)
    try {
        // Firebase Firestore
        const db = fadmin.firestore();
        const eventResponse = await db.collection("events").doc().set(event);

        res.status(200).json({
            message: 'Event created successfully'
        });

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
