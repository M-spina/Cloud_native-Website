const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');
const db = fadmin.firestore();

router.get('/all/:id', async (req, res, next) => {
    
    try {

        const studRef = db.collection('students').doc(req.params.id);
        const studDoc = await studRef.get();

        const myEvents = studDoc.data().myEvents;

        const eventsRef = db.collection('events');
        const response = await eventsRef.get();
        const responseArr = [];

        response.forEach(doc => {

            if (myEvents.includes(doc.id)){
                responseArr.push({
                    id: doc.id,
                    data: doc.data(),
                    disable: true
                });   
            } else {
                responseArr.push({
                    id: doc.id,
                    data: doc.data(),
                    disable: false
                }); 
            }
        });

        res.send(responseArr);

    } catch (err) {
        // Handle error
        console.error(err);
        res.status(500).json({
            code: err.code,
            error: err.message
        });
    }

});

router.get('/all/ext', async (req, res, next) => {
    
    try {

        const eventsRef = db.collection('events');
        const response = await eventsRef.get();
        const responseArr = [];

        response.forEach(doc => {
            responseArr.push({
                id: doc.id,
                data: doc.data(),
            });   
        });

        res.send(responseArr);

    } catch (err) {
        // Handle error
        console.error(err);
        res.status(500).json({
            code: err.code,
            error: err.message
        });
    }

});

router.delete('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: 'event deleted!',
    });
});

module.exports = router;