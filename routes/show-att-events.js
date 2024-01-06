const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');
const db = fadmin.firestore();

router.get('/all/:id', async (req, res, next) => {
    
    try {
        const studRef = db.collection('students').doc(req.params.id);
        const studDoc = await studRef.get();
        
        const myEvents = studDoc.data().myEvents;

        if (!myEvents || myEvents.length === 0) {
            res.status(201).json({ 
                message: 'No event found' 
            });
            return;
        } else {
            const eventsRef = db.collection('events');
            const query = eventsRef.where(fadmin.firestore.FieldPath.documentId(), 'in', myEvents);   

            const response = await query.get();
            const eventsArr = [];

            response.forEach(doc=> {
                eventsArr.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });

            res.send(eventsArr);
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

router.get('/all/created/:id', async (req, res, next) => {
    
    try {
        const uid = req.params.id;

        ////
        const eventsRef = db.collection('events');
        const eventsRes = await eventsRef.get();
        const responseArr = [];

        eventsRes.forEach((doc)=> {
            const createdBy = doc.data().createdBy;
            if (createdBy === uid) {
                responseArr.push({
                    id: doc.id,
                    data: doc.data(),
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



///////

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