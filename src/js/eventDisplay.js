import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', async function () {

    const response = await fetch('./firebase/firebaseConfig.json');
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    auth.onAuthStateChanged(async (userChecked) => {
        if (userChecked) {
            loggedIn();

            const uid = userChecked.uid;

            await fetch(`/events/show/all/${uid}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response failed');
                }
                return response.json();
            })
            .then(data => {
                // Assuming data is an array of event objects
                // Update the table in events.ejs with the retrieved data
                updateTable(data);
            })
            .catch(error => {
                console.error('Error retrieving data: ', error);
            });
        } else {
            notLoggedIn();
            await fetch(`/events/show/ext`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response failed');
                }
                return response.json();
            })
            .then(data => {
                // Assuming data is an array of event objects
                // Update the table in events.ejs with the retrieved data
                updateTableExt(data);
            })
            .catch(error => {
                console.error('Error retrieving data: ', error);
            });
        }
    });

    // Function to update the table in events.ejs
    function updateTable(data) {
        
        if(data){
            const tableRows = data.map((event, index) => {

                return `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${event.data.name}</td>
                            <td>${event.data.description}</td>
                            <td>${event.data.category}</td>   
                            <td>${event.data.location}</td>
                            <td>${event.data.startdate}</td>
                            <td>${event.data.enddate}</td>
                            <td><img src="${event.data.imageFile}" style="max-width: 500px; max-height: 750px;"></td>                              
                            <td>
                                <button class="attend-button" data-event-doc-id="${event.id}" ${event.disable ? 'disabled' : ''}>
                                    ${event.disable ? 'Attended' : 'Attend'}
                                </button>
                            </td>                              
                        </tr>`;
            });
        
            const tbody = document.querySelector('tbody');
            tbody.innerHTML = tableRows.join('');
        }

        // Attach a click event listener to the "Attend" button
        document.querySelectorAll('.attend-button').forEach(button => {
            button.addEventListener('click', async function () {

                const event_doc_id = this.dataset.eventDocId;
                const userChecked = auth.currentUser;
                const uid = userChecked.uid;
                
                // Make an AJAX request to the server to record attendance
                await fetch('/events/attend', {
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
                .then(data => {
                    if (data.success) {
                        const button = document.querySelector(`.attend-button[data-event-doc-id="${event_doc_id}"]`);

                        // Change the button text to "Attended" & disable it
                        button.innerHTML = 'Attended';
                        button.disabled = true;
                        button.classList.add('disabled');
                    }
                })
                .catch(error => {
                    console.error('Error recording attendance:', error);
                });
            });
        });
    }

    function updateTableExt(data) {
        
        if(data){
            const tableRows = data.map((event, index) => {

                return `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${event.data.name}</td>
                            <td>${event.data.description}</td>
                            <td>${event.data.category}</td>   
                            <td>${event.data.location}</td>
                            <td>${event.data.startdate}</td>
                            <td>${event.data.enddate}</td>
                            <td><img src="${event.data.imageFile}" style="max-width: 500px; max-height: 750px;"></td>                              
                            <td><button class="attend-button" data-event-doc-id="${event.id}" disabled >Attend</button></td>                              
                        </tr>`;
            });

            const tbody = document.querySelector('tbody');
            tbody.innerHTML = tableRows.join('');
        }
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

function notLoggedIn() {
    toggleVisibility('li > a[href="/login"], li > a.menu__item[href="/login"]');
    toggleVisibility('li > a[href="/events"], li > a.menu__item[href="/events"]');
    toggleVisibility('li > a[href="/report"], li > a.menu__item[href="/report"]');
}