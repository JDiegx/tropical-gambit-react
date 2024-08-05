// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAIx4BG3CIzAD2CgkWljbyvdT-CLYq3aw4",
    authDomain: "tropical-gambit.firebaseapp.com",
    projectId: "tropical-gambit",
    storageBucket: "tropical-gambit.appspot.com",
    messagingSenderId: "926671944694",
    appId: "1:926671944694:web:dbff6f54a449e491dda5d7",
    measurementId: "G-F3X1V880TV"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
