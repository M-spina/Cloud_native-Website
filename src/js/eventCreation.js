import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

var uid;

document.addEventListener('DOMContentLoaded', async () => {
    
    const response = await fetch('./firebase/firebaseConfig.json');
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    auth.onAuthStateChanged(async (userChecked) => {
        if (userChecked) {
            uid = userChecked.uid;
            loggedIn();
        } else {
            window.location.href = '/'
        }
    });
    
});

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const formData = new FormData();
        formData.append('uid', uid);
        formData.append('name', document.getElementById('eventName').value);
        formData.append('location', document.getElementById('eventLocation').value);
        formData.append('category', document.getElementById('category').value);
        formData.append('startdate', document.getElementById('eventstartDate').value);
        formData.append('enddate', document.getElementById('eventendDate').value);
        formData.append('description', document.getElementById('eventDescription').value);
        formData.append('imageFile', document.getElementById('imageFile').files[0]);

        const response = await fetch(`/events/create`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = '/events'
        } else {
            window.location.href = '/eventcreation'
        }
    } catch (error) {
        console.error(error);
    }

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
