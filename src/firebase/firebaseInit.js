import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

const response = await fetch('./firebase/firebaseConfig.json');
const firebaseConfig = await response.json();

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };