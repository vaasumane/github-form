import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA_7rupLovzkNXCn2Awz2aZP5tFIfnBbqU",
    authDomain: "github-form.firebaseapp.com",
    projectId: "github-form",
    storageBucket: "github-form.appspot.com",
    messagingSenderId: "305675828847",
    appId: "1:305675828847:web:aea4dd36d68eaa78e2979a",
    measurementId: "G-J2BTMS34TN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// You can initialize other Firebase services as needed (e.g., auth, firestore)
const auth = firebase.auth();
const firestore = firebase.firestore();

export { auth, firestore };
export default firebase;
