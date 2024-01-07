import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { doc, setDoc, getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { app, auth } from '../firebase/firebaseInit.js';

document.getElementById('form').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Disable submit button
    const submitButton = document.getElementById('submitBtn');
    submitButton.disabled = true;

    const emailValue = document.getElementById('email').value.trim();
    const passwordValue = document.getElementById('password').value.trim();

    try {
        // Sign in with email and password
        const userCredential = await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        const user = userCredential.user;

        onAuthStateChanged(auth, (userChecked) => {
            if (userChecked) {
                window.location.href = '/events'
            } else {
                window.location.href = '/login'
            }
        });
        
    } catch (error) {
        if (emailValue === '' || error.code === 'auth/invalid-email') {
            setError(email, 'Invalid Email');
        }else{
            setSuccess(email);
        }

        if (passwordValue === '' || error.code === 'auth/missing-password' || error.code === 'auth/invalid-credential') {
            setError(password, 'Invalid Password');
        }else{
            setSuccess(password);
        }

    } finally {
        // Enable submit button after fetch completes
        submitButton.disabled = false;
    }
});

document.getElementById('googleSignIn').addEventListener('click', async function (event) {
    event.preventDefault();

    try {
        const db = getFirestore(app);

        const provider = new GoogleAuthProvider();

        // Sign in with a popup
        const result = await signInWithPopup(auth, provider);

        // Add user information to Firestore
        const user = result.user;
        const uid = user.uid;
        const fullname = user.displayName;
        const currentDate = new Date();
        const dateString = currentDate.toISOString();
        const yearMonthDate = dateString.substring(0, 10);

        await setDoc(doc(db,"students",uid),{
            fullname,
            registrationDate: yearMonthDate,
        });

        onAuthStateChanged(auth, (userChecked) => {
            if (userChecked) {
                window.location.href = '/events'
            } else {
                window.location.href = '/login'
            }
        });

    } catch (error) {
        console.error(error);
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




