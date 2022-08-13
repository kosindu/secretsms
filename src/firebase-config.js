// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD_GkNUc-CaPEpBq8qgt8pNqPTuEf875OM',
  authDomain: 'secretsms-e5b00.firebaseapp.com',
  projectId: 'secretsms-e5b00',
  storageBucket: 'secretsms-e5b00.appspot.com',
  messagingSenderId: '531582292285',
  appId: '1:531582292285:web:1c809fda0e99c72831f554',
  measurementId: 'G-ETPGT6CLWL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
