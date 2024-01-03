import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { doc, setDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const response = await fetch('./firebase/firebaseConfig.json');
const firebaseConfig = await response.json();

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
            //window.location.href = '/attendance'
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

    try {
        const db = getFirestore(app);

        // Create a GoogleAuthProvider instance
        const provider = new GoogleAuthProvider();

        // Sign in with a popup
        const result = await signInWithPopup(auth, provider);

        // Add user information to Firestore
        const user = result.user;
        const uid = user.uid;
        const fullname = user.displayName;

        await setDoc(doc(db,"students",uid),{fullname});

        var userChecked = auth.currentUser;

        onAuthStateChanged(auth, (userChecked) => {
            if (userChecked) {
                console.log("User is signed in:", userChecked);
                //window.location.href = '/'
            } else {
                console.log("User Not Signed In")
                window.location.href = '/login'
            }
        });

    } catch (error) {
        console.error(error);
        //alert('An unexpected error occurred.');
    }
});

document.getElementById('signOut').addEventListener('click', async function (event) {
    event.preventDefault();

    signOut(auth)
    .then(() => {
        window.location.href = '/'
    })
    .catch((error) => {
        console.error("Error signing out:", error);
    });

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

