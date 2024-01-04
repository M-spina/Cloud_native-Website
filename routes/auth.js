const firebase = require('firebase/auth');
const app = require('../src/firebase/firebaseInit');

const authenticateUser = (req, res, next) => {
    const auth = firebase.getAuth(app);
    var user = auth.currentUser;

    // Listen for authentication state changes
    if (user) {
        req.user = user; // You can store the user object in the request for later use
        next();
    } else {
        // User is not signed in, redirect to the login page or take appropriate action
        console.log(">>>>")
        console.log(user)
        //res.redirect('/login');
    }
};

module.exports = authenticateUser;
