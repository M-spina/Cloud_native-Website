import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

var uid;
var event_doc_id;

document.addEventListener('DOMContentLoaded', async () => {
    
    const response = await fetch('./firebase/firebaseConfig.json');
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const urlParams = new URLSearchParams(window.location.search);
    event_doc_id = urlParams.get('edi');

    auth.onAuthStateChanged(async (userChecked) => {
        if (userChecked) {
            uid = userChecked.uid;
            loggedIn();

            await fetch(`/events/edit/${event_doc_id}/${uid}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response failed');
                }
                return response.json();
            })
            .then(data => {
                updateEditForm(data);
            })
            .catch(error => {
                console.error('Error retrieving data: ', error);
            });

        } else {
            window.location.href = '/'
        }
    });

    // Function to update the form in editEvent.ejs
    function updateEditForm(values) {
        if (values.data) {
            // Get form elements
            const form = document.getElementById('form');
            const eventNameInput = document.getElementById('eventName');
            const eventLocationInput = document.getElementById('eventLocation');
            const categorySelect = document.getElementById('category');
            const eventStartDateInput = document.getElementById('eventstartDate');
            const eventEndDateInput = document.getElementById('eventendDate');
            const eventDescriptionInput = document.getElementById('eventDescription');

            // Populate form fields with data
            eventNameInput.value = values.data.name || '';
            eventLocationInput.value = values.data.location || '';
            categorySelect.value = values.data.category || '';
            eventStartDateInput.value = values.data.startdate || '';
            eventEndDateInput.value = values.data.enddate || '';
            eventDescriptionInput.value = values.data.description || '';
        }
    }
    
});

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    await fetch('/events/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            event_doc_id,
            uid,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response failed');
        }
        return response.json();
    })
    .then(async data => {

        if (data.success) {
            try {
                const formData = new FormData();
                formData.append('uid', uid);
                formData.append('event_doc_id', event_doc_id);
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
        
                await response.json();
        
                if (response.ok) {
                    window.location.href = '/attendance';
                } else {
                    location.reload();
                }
            } catch (error) {
                console.error(error);
            }
        }
    })
    .catch(error => {
        console.error('Error recording attendance:', error);
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
