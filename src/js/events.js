document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const response = await fetch('/events/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: document.getElementById('eventName').value,
                location: document.getElementById('eventLocation').value,
                date: document.getElementById('eventDate').value,
                description: document.getElementById('eventDescription').value,
                imgFile: document.getElementById('imageFile').value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert(`${data.code} /// ${data.error}`);
        }
    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred.');
    }
});
