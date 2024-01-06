const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');
const db = fadmin.firestore();

router.get('/:event_doc_id/:uid', async (req, res, next) => {

    try {
        const event_doc_id = req.params.event_doc_id;
        const uid = req.params.uid; 
        
        const eventsRef = db.collection('events').doc(event_doc_id);
        const eventRes = await eventsRef.get();
        const createdBy = eventRes.data().createdBy;  

        if (uid && createdBy && uid === createdBy) {
            const eventData = eventRes.data();
            res.status(200).json({ 
                success: true, 
                data: eventData 
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
