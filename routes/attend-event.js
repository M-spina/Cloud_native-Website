const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');

router.post('/', async (req, res, next) => {

    try {
        
        const event_doc_id = req.body.event_doc_id;
        const uid = req.body.uid; // Access the current user's UID
        
        const db = fadmin.firestore();
        await db.collection("students").doc(uid).update({
            myEvents: fadmin.firestore.FieldValue.arrayUnion(event_doc_id),
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
