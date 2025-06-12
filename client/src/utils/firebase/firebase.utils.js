// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword
 } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    Firestore
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCu42LnRpzXb4dgGxmradGIQ0D6nag7-zo",
  authDomain: "crown-eshop-db-30687.firebaseapp.com",
  projectId: "crown-eshop-db-30687",
  storageBucket: "crown-eshop-db-30687.firebasestorage.app",
  messagingSenderId: "421909585803",
  appId: "1:421909585803:web:fb400dd3b55d81f23c198e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInfo = {}) => {
if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    // the snapshot allows to know if an instance of the data exists in the DB
    // and allows us to access the data
    const userSnapshot = await getDoc(userDocRef);

    // if user data exists
    // > return userDocRef
    // if user data does not exist
    // create / set the document with the userAuth data in the collection 

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAd = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAd,
                ...additionalInfo
            })
        } catch (err) {
            console.log('error creating the user', err.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    
    return createUserWithEmailAndPassword(auth, email, password);
}