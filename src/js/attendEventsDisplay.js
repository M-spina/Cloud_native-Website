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
            
            // Attended Events
            await fetch(`/att-events/show/all/${uid}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response failed');
                }
                return response.json();
            })
            .then(data => {
                updateAttendedTable(data);
            })
            .catch(error => {
                console.error('Error retrieving data: ', error);
            });

            // Created Events
            await fetch(`/att-events/show/all/created/${uid}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response failed');
                }
                return response.json();
            })
            .then(data => {
                updatecreatedTable(data);
            })
            .catch(error => {
                console.error('Error retrieving data: ', error);
            });
        } else {
            window.location.href = '/'
        }
    });

    function updateAttendedTable(data) {

        if(data.message != "No event found"){
            const tableRows = data.map((event, index) => {

                return `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${event.data.name}</td>
                            <td>${event.data.description}</td>
                            <td>${event.data.category}</td>   
                            <td>${event.data.location}</td>
                            <td>${event.data.startdate}</td>
                            <td>${event.data.enddate}</td>
                            <td><img src="${event.data.imageFile}" style="max-width: 450px; max-height: 700px;"></td>                              
                            <td><button class="attended-button" data-event-doc-id="${event.id}">Unattend</button></td>                              
                        </tr>`;
            });

            const tbody = document.querySelector('.attended');
            tbody.innerHTML = tableRows.join('');
        }

        // Attach a click event listener to the "Remove" button
        document.querySelectorAll('.attended-button').forEach(button => {
            button.addEventListener('click', async function () {

                const event_doc_id = this.dataset.eventDocId;
                const userChecked = auth.currentUser;
                const uid = userChecked.uid;
                
                // Make an AJAX request to the server to record attendance
                await fetch('/events/unattend', {
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
                        location.reload();
                    }
                })
                .catch(error => {
                    console.error('Error recording attendance:', error);
                });
            });
        });
    }

    function updatecreatedTable(data) {

        if(data.message != "No event found"){
            const tableRows = data.map((event, index) => {

                return `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${event.data.name}</td>
                            <td>${event.data.description}</td>
                            <td>${event.data.category}</td>   
                            <td>${event.data.location}</td>
                            <td>${event.data.startdate}</td>
                            <td>${event.data.enddate}</td>
                            <td><img src="${event.data.imageFile}" style="max-width: 450px; max-height: 700px;"></td>                              
                            <td><button class="attended-button" data-event-doc-id="${event.id}">Unattend</button></td>                              
                        </tr>`;
            });

            const tbody = document.querySelector('.created');
            tbody.innerHTML = tableRows.join('');
        }

        // Attach a click event listener to the "Remove" button
        document.querySelectorAll('.attended-button').forEach(button => {
            button.addEventListener('click', async function () {

                const event_doc_id = this.dataset.eventDocId;
                const userChecked = auth.currentUser;
                const uid = userChecked.uid;
                
                // Make an AJAX request to the server to record attendance
                await fetch('/events/unattend', {
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
                        location.reload();
                    }
                })
                .catch(error => {
                    console.error('Error recording attendance:', error);
                });
            });
        });
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
