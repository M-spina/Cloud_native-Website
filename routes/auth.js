const firebase = require('firebase/auth');
const app = require('./firebaseInit');

const authenticateUser = (req, res, next) => {
    const auth = firebase.getAuth(app);

    // Listen for authentication state changes
    firebase.onAuthStateChanged(auth, (user) => {
        if (user) {
            req.user = user; // You can store the user object in the request for later use
            next();
        } else {
            // User is not signed in, redirect to the login page or take appropriate action
            res.redirect('/login');
        }
    });
};

module.exports = authenticateUser;
