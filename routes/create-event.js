const express = require('express');
const router = express.Router();
const fadmin = require('firebase-admin');
const multer = require("multer");
const { getStorage, getDownloadURL, ref } = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const firebaseConfig = require('../src/firebase/firebaseConfig.json');

const app = initializeApp(firebaseConfig);

// Set up multer for handling file uploads
const multerStorage = multer.memoryStorage();
const upload = multer({ 
    storage: multerStorage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB 
    }
});

router.post('/', upload.single('imageFile'), async (req, res, next) => {
    
    //console.log(event)
    try {
        // Firebase Firestore
        const db = fadmin.firestore();

        // Handle image upload
        if (!req.file){
            return res.status(400).send("No file uploaded");
        }

        if (req.file) {
            const bucket = fadmin.storage().bucket();
            const currentDate = new Date().toISOString().split('T')[0];     // "YYYY-MM-DD"
            const fileName = `${req.file.originalname}-${currentDate}-${123}.png`;      //// to add uid in 123
            const blob = bucket.file(fileName);
            const blobStream = blob.createWriteStream({ 
                gzip: true 
            });

            blobStream.on('error', (err) => {
                console.error(err);
                return res.status(500).json({ error: 'Unable to upload image' });
            });

            blobStream.on('finish', async () => {

                const storage = getStorage(app);

                const imageUrl = await getDownloadURL(ref(storage, `${blob.name}`));

                //const imageUrl = `https://firebasestorage.googleapis.com/${bucket.name}/${blob.name}`;

                // Create event document with the image URL
                const event = {
                    name: req.body.name,
                    location: req.body.location,
                    category: req.body.category,
                    startdate: req.body.startdate,
                    enddate: req.body.enddate,
                    description: req.body.description,
                    imageFile: imageUrl,    // Add the image URL to the event
                };

                await db.collection('events').doc().set(event);

                return res.status(201).json({
                    message: 'Event created successfully',
                    imageUrl: imageUrl,
                });
            });

            blobStream.end(req.file.buffer);
        }  

        else {
            // Create event document without the image URL
            const event = {
                name: req.body.name,
                location: req.body.location,
                category: req.body.category,
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                description: req.body.description,
            };

            await db.collection('events').doc().set(event);

            return res.status(200).json({
                message: 'Event created successfully',
            });
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
