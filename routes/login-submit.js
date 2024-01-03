const express = require('express');
const router = express.Router();
const firebase = require('firebase/auth');
const app = require('./firebaseInit');

router.post('/', async (req, res, next) => {
    
    try { 
        // Firebase Authentication
        const auth = firebase.getAuth(app);
        
        const user = {
            email: req.body.email,
            password: req.body.password
        };
        await firebase.signInWithEmailAndPassword(
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
