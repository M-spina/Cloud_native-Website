import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

function loggingOut(){
    document.getElementById('logOut').addEventListener('click', async function (event) {
        event.preventDefault();
        const response = await fetch('./firebase/firebaseConfig.json');
        const firebaseConfig = await response.json();
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
    
        signOut(auth)
        .then(() => {
            window.location.href = '/'
        })
        .catch((error) => {
            console.error("Error signing out:", error);
        });
    });
}

loggingOut();