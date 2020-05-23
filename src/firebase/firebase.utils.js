import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDZmUG_jN3Lc7zMnRs6UVB7-L_D_UKVFeg",
    authDomain: "dm-clothing.firebaseapp.com",
    databaseURL: "https://dm-clothing.firebaseio.com",
    projectId: "dm-clothing",
    storageBucket: "dm-clothing.appspot.com",
    messagingSenderId: "718663385721",
    appId: "1:718663385721:web:2f3fc7254c8e114a7b8aa8",
    measurementId: "G-JTFD2TEPSS"
};

// passing in the userAuth object I see in the console.log()
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get()

    // checking if there is any data in the snapShot - if not, create one
    if(!snapShot.exists) {
        // deconstructing for the displayname and email
        const { displayName, email } = userAuth;
        // tells us the current date and time this was invoked
        const createdAt = new Date();

        try {
            // creating user
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (err) {
            console.log('error creating user', err.message);
        }
    }

    
    return userRef;

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Google auth utility
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account'
});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
