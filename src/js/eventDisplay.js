document.addEventListener('DOMContentLoaded', function () {
    fetch('/events/show/all') 
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

    // Function to update the table in events.ejs
    function updateTable(data) {
        
        const tableRows = data.map((event, index) => {

            return `<tr>
                        <th scope="row">${index + 1}</th>
                        <td>${event.data.name}</td>
                        <td>${event.data.description}</td>
                        <td>${event.data.category}</td>   
                        <td>${event.data.location}</td>
                        <td>${event.data.startdate}</td>
                        <td>${event.data.enddate}</td>
                        <td><img src="${event.data.imageFile}" style="max-width: 500px; max-height: 500px;"></td>                              
                        <td><button class="attend-button" data-event-doc-id="${event.id}">Attend</button></td>                              
                    </tr>`;
        });

        const tbody = document.querySelector('tbody');
        tbody.innerHTML = tableRows.join('');

        // Attach a click event listener to the "Attend" buttons
        document.querySelectorAll('.attend-button').forEach(button => {
        button.addEventListener('click', function () {
            const event_doc_id = this.dataset.eventDocId;

            console.log('Button clicked. Data attribute:', this.dataset);

            // Make an AJAX request to the server to record attendance
            fetch('/events/attend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ event_doc_id }),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response failed');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data.message);
                })
                .catch(error => {
                    console.error('Error recording attendance:', error);
                });
        });
    });

    }
});