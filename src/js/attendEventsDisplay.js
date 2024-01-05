import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', async function () {
        
    const response = await fetch('./firebase/firebaseConfig.json');
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    auth.onAuthStateChanged(async (userChecked) => {
        if (userChecked) {
            const uid = userChecked.uid;
        
            await fetch(`/att-events/show/all/${uid}`) 
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
            console.log("No user is currently signed in");
        }
    });

    // Function to update the table in events.ejs
    function updateTable(data) {

        if(data.message != "No events found"){
            const tableRows = data.map((event, index) => {

                return `<tr>
                            <th scope="row">${index + 1}</th>
                            <td>${event.data.name}</td>
                            <td>${event.data.description}</td>
                            <td>${event.data.category}</td>   
                            <td>${event.data.location}</td>
                            <td>${event.data.startdate}</td>
                            <td>${event.data.enddate}</td>
                            <td><img src="${event.data.imageFile}" style="max-width: 800px; max-height: 1000px;"></td>                              
                            <td><button class="remove-button" data-event-doc-id="${event.id}">Unattend</button></td>                              
                        </tr>`;
            });

            const tbody = document.querySelector('tbody');
            tbody.innerHTML = tableRows.join('');
        }

        // Attach a click event listener to the "Remove" button
        document.querySelectorAll('.remove-button').forEach(button => {
            button.addEventListener('click', async function () {

                const event_doc_id = this.dataset.eventDocId;
                const userChecked = auth.currentUser;
                const uid = userChecked.uid;
                
                // Make an AJAX request to the server to record attendance
                await fetch('/events/remove', {
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