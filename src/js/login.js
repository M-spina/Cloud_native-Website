document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const response = await fetch('/login/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                //auth: auth
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = '/'
        } else {
            alert(`${data.code} /// ${data.error}`);
        }
    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred.');
    }
});
