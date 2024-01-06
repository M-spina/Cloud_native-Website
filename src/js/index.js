import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    const response = await fetch('./firebase/firebaseConfig.json');
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    auth.onAuthStateChanged(async (userChecked) => {
        if (userChecked) {
            loggedIn();

        } else {
            notLoggedIn();
        }
    });
    
});

function toggleVisibility(selector) {
    var links = document.querySelectorAll(selector);

    links.forEach(function (link) {
        var liElement = link.parentElement;
        liElement.style.display = (liElement.style.display === 'none') ? '' : 'none';
    });
}

function loggedIn() {
    toggleVisibility('li > a[href="/events"], li > a.menu__item[href="/events"]');
    toggleVisibility('li > a[href="/attendance"], li > a.menu__item[href="/attendance"]');
    toggleVisibility('li > a[href="/report"], li > a.menu__item[href="/report"]');
    toggleVisibility('.cta#logOut button');
    toggleVisibility('li > a#logOut.menu__item');
}

function notLoggedIn() {
    toggleVisibility('li > a[href="/login"], li > a.menu__item[href="/login"]');
    toggleVisibility('li > a[href="/events"], li > a.menu__item[href="/events"]');
    toggleVisibility('li > a[href="/report"], li > a.menu__item[href="/report"]');
}