import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyCNeKFAK02fsjZ_zL8S_HVMGiktJYldnXY",
    authDomain: "university-events-manager.firebaseapp.com",
    projectId: "university-events-manager",
    storageBucket: "university-events-manager.appspot.com",
    messagingSenderId: "20800034316",
    appId: "1:20800034316:web:3c052e45a594003d9b4029",
    measurementId: "G-8WZ1BEWCXF"
};

console.log(firebaseConfig);

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create a GoogleAuthProvider instance
const provider = new GoogleAuthProvider();


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

document.getElementById('googleSignOn').addEventListener('click', async function (event) {
    event.preventDefault();
    console.log("Button Clicked");
    try {
        

        // Sign in with a popup
        const result = await signInWithPopup(auth, provider);

        // Access user information
        const user = result.user;
        console.log(user);

        // Redirect or perform additional actions as needed
        window.location.href = '/'; // Change the URL to your desired destination

    } catch (error) {
        console.error(error);
        alert('An unexpected error occurred.');
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
