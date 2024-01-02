document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const formData = new FormData();
        formData.append('name', document.getElementById('eventName').value);
        formData.append('location', document.getElementById('eventLocation').value);
        formData.append('category', document.getElementById('category').value);
        formData.append('startdate', document.getElementById('eventstartDate').value);
        formData.append('enddate', document.getElementById('eventendDate').value);
        formData.append('description', document.getElementById('eventDescription').value);
        formData.append('imageFile', document.getElementById('imageFile').files[0]);

        const response = await fetch('/events/create', {
            method: 'POST',
            body: formData
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
