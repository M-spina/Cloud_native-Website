import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    
    const response = await fetch('./firebase/firebaseConfig.json');
    const firebaseConfig = await response.json();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    auth.onAuthStateChanged(async (userChecked) => {
        if (userChecked) {
            loggedIn();

        } else {
            notLoggedIn();
        }
    });
    
});

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    // Disable submit button
    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;

    try {
        var isValid = validateInputs();

        if (isValid == true){

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
            }else if (response.ok) {
                window.location.href = '/login'
            } else {
                console.error(`${data.code} <> ${data.error}`);
            }
        } else {
            console.error('Form validation failed');
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

const isValidEmail = email =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLocaleLowerCase());
}

const validateInputs = () =>{
    let isValid = true;
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(fnameValue === ''){
        setError(fname, 'First Name is required');
        isValid = false;
    }else{
        setSuccess(fname);
    }

    if(lnameValue === ''){
        setError(lname, 'Last Name is required');
        isValid = false;
    }else{
        setSuccess(lname);
    }

    if(emailValue === ''){
        setError(email, 'Email is required');
        isValid = false;
    }else if(!isValidEmail(emailValue)){
        setError(email, 'Provide a vaiid email address');
        isValid = false;
    }else{
        setSuccess(email);
    }

    if(passwordValue === ''){
        setError(password, 'Password is required');
        isValid = false;
    }else if( passwordValue.length < 6){
        setError(password, 'Password must be at least 6 characters')
        isValid = false;
    }else{
        setSuccess(password)
    }

    if(password2Value === ''){
        setError(password2, 'Please confirm your password');
        isValid = false;
    }else if( password2Value !== passwordValue){
        setError(password2, 'Password does not match')
        isValid = false;
    }else{
        setSuccess(password2)
    }

    return isValid;
    
}

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
