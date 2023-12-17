document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Disable submit button
    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;

    try {
        const response = await fetch('/login/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            }),
        });

        const data = await response.json();

        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();

        if (emailValue === '' || data.code === 'auth/invalid-email') {
            setError(email, 'Invalid Email');
        }else{
            setSuccess(email);
        }

        if (passwordValue === '' || data.code === 'auth/missing-password' || data.code === 'auth/invalid-credential') {
            setError(password, 'Invalid Password');
        }else{
            setSuccess(password);
        }
        
        if (response.ok) {
            alert(data.message);
            window.location.href = '/login'
        } else {
            console.error(`${data.code} <> ${data.error}`);
        }
        
    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred.');
    } finally {
        // Enable submit button after fetch completes
        submitButton.disabled = false;
    }
});

const setError = (element,message) =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
}
