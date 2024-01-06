const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');

router.post('/', async (req, res, next) => {

    try {
        
        const event_doc_id = req.body.event_doc_id;
        const uid = req.body.uid; 
        
        const db = fadmin.firestore();  

        // delete event from "event" db
        const eventRef = db.collection("events").doc(event_doc_id);
        const eventRes = await eventRef.get();
        const createdBy = eventRes.data().createdBy;  
        const imageFile = eventRes.data().imageFile;  

        if (uid === createdBy) {
            // remove event from all events db
            await eventRef.delete();

            // remove event id from all students db's myEvents 
            const studRef = db.collection('students');
            const studRes = await studRef.get();

            studRes.forEach(async (doc)=> {
                const myEvents = doc.data().myEvents;
                if (myEvents && myEvents.includes(event_doc_id)) {
                    studRef.doc(doc.id).update({
                        myEvents: fadmin.firestore.FieldValue.arrayRemove(event_doc_id),
                    });
                    
                    // remove event's image from Cloud Storage
                    const bucket = fadmin.storage().bucket();
                    const filePath = `${imageFile}`; 
                    await bucket.file(filePath).delete();

                } 
            });   
        }
        
        res.status(200).json({ 
            success: true 
        });

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
