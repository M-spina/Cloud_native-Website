const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');
const db = fadmin.firestore();

router.get('/all', async (req, res, next) => {
    
    try {

        const eventsRef = db.collection('events');
        const response = await eventsRef.get();
        let responseArr = [];

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

router.get('/:id', async (req, res, next) => {
    
    try {

        const eventRef = db.collection('events').doc(req.params.id);
        const response = await eventRef.get();

        res.send(response.data());

    } catch (err) {
        // Handle error
        console.error(err);
        res.status(500).json({
            code: err.code,
            error: err.message
        });
    }

});

router.patch('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: 'event updated!',
    });
});

router.delete('/:eventId', (req, res, next) => {
    res.status(200).json({
        message: 'event deleted!',
    });
});

module.exports = router;