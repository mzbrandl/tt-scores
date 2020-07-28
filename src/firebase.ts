import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: "AIzaSyCzZBaZdVwZ9dj_wqJ2cum1LfXVh0ucEFk",
  authDomain: "tt-scores-1595920568034.firebaseapp.com",
  databaseURL: "https://tt-scores-1595920568034.firebaseio.com",
  projectId: "tt-scores-1595920568034",
  storageBucket: "tt-scores-1595920568034.appspot.com",
  messagingSenderId: "429581450020",
  appId: "1:429581450020:web:b9b8fe7c58c9bcc8ff91b1"
};

firebase.initializeApp(firebaseConfig);

export default firebase;