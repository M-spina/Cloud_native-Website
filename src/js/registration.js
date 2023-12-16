document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        var isValid = validateInputs();

        if (isValid == "0") {
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

            if (data.code === 'auth/email-already-exists') {
                setError(email, 'The email address is already in use by another account');
            } else if (response.ok) {
                alert(data.message);
            } else {
                console.error(`${data.code} <> ${data.error}`);
            }
        } else {
            console.error('Form validation failed');
        }
    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred.');
    }
});

const setError= (element,message) =>{
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

const isValidEmail = email =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLocaleLowerCase());
}

const validateInputs = () =>{
    var isValid = 0;
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(fnameValue === ''){
        setError(fname, 'First Name is required');
        isValid++;
    }else{
        setSuccess(fname);
    }

    if(lnameValue === ''){
        setError(lname, 'Last Name is required');
        isValid++;
    }else{
        setSuccess(lname);
    }

    if(emailValue ===''){
        setError(email, 'Email is required');
        isValid++;
    }else if(!isValidEmail(emailValue)){
        setError(email, 'Provide a vaiid email address');
        isValid++;
    }else{
        setSuccess(email);
    }

    if(passwordValue === ''){
        setError(password, 'Password is required');
        isValid++;
    }else if( passwordValue.length < 6){
        setError(password, 'Password must be at least 6 characters')
        isValid++;
    }else{
        setSuccess(password)
    }

    if(password2Value === ''){
        setError(password2, 'Please confirm your password');
        isValid++;
    }else if( password2Value !== passwordValue){
        setError(password2, 'Password does not match')
        isValid++;
    }else{
        setSuccess(password2)
    }

    return isValid;
    
}
