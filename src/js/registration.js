document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const response = await fetch('/register/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fname: document.getElementById('fname').value,
                lname: document.getElementById('lname').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred.');
    }
});
