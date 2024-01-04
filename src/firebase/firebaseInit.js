const { initializeApp } = require("firebase/app");
const firebaseConfig = require('./firebaseConfig.json');

const app = initializeApp(firebaseConfig);

module.exports = app;