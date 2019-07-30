
import firebase from 'firebase';

const config = {
  // me.rahmat.hidayat
  // apiKey: 'AIzaSyC3j5KELQx7WEhZILyOiCq0yDhUQeijvu0',
  // authDomain: 'hijrhec.firebaseapp.com',
  // databaseURL: 'https://hijrhec.firebaseio.com',
  // projectId: 'hijrhec',
  // storageBucket: 'hijrhec.appspot.com',
  // messagingSenderId: '669251955422',

  // hecmobileapp@gmail.com
  apiKey: "AIzaSyAKZ9QlpcCfWaSbttVXDTn8KMu31WSxIKE",
  authDomain: "fbhecc.firebaseapp.com",
  databaseURL: "https://fbhecc.firebaseio.com",
  projectId: "fbhecc",
  storageBucket: "fbhecc.appspot.com",
  messagingSenderId: "1048279874447",
  appId: "1:1048279874447:web:7faeca5a1dfcbac2"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
const authEmailProvider = firebase.auth.EmailAuthProvider;

export {
  db,
  auth,
  storage,
  authEmailProvider,
};
