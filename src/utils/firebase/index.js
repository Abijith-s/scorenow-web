import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDx_BibhPGV9lf43APnWmO3xRoZoZqCoGY",
    authDomain: "scorenow.live",
    projectId: "score-now-92d5e",
    storageBucket: "score-now-92d5e.appspot.com",
    messagingSenderId: "864530482316",
    appId: "1:864530482316:web:459a6ef302278b9b89e7a9",
    measurementId: "G-DPDN8C68JV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app