const { initializeApp } = require("firebase/app");
const firebaseConfig = require('../src/firebase/firebaseConfig.json');

const app = initializeApp(firebaseConfig);

module.exports = app;