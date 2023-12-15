const express = require('express');
const router = express.Router();
const firebase = require('firebase/auth');
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyCNeKFAK02fsjZ_zL8S_HVMGiktJYldnXY",
    authDomain: "university-events-manager.firebaseapp.com",
    projectId: "university-events-manager",
    storageBucket: "university-events-manager.appspot.com",
    messagingSenderId: "20800034316",
    appId: "1:20800034316:web:3c052e45a594003d9b4029",
    measurementId: "G-8WZ1BEWCXF"
};

router.post('/', async (req, res, next) => {
    // Firebase Authentication
    const app = initializeApp(firebaseConfig);
    const auth = firebase.getAuth(app)
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    try { 
        const userCredential = await firebase.signInWithEmailAndPassword(
            auth,
            user.email, 
            user.password
        );

        res.status(200).json({
            message: 'User login successful',
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
