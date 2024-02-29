// firebaseConfig.js

const firebaseConfig = {
    apiKey: "AIzaSyCYCsgdzizW0fEoV3T4Id2_fludfrzT7zg",
    authDomain: "easestudyante.firebaseapp.com",
    projectId: "easestudyante",
    storageBucket: "easestudyante.appspot.com",
    messagingSenderId: "141303746499",
    appId: "1:141303746499:web:8729be7c6e4237e4b53776",
    measurementId: "G-XBRQFSYBTB"
};

firebase.initializeApp(firebaseConfig);

export function getFirestore() {
    return firebase.firestore();
}