import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyATwhKiVUDSgLL4ZxoYa9w_vkPv2FA0w5g",
    authDomain: "snake-envy.firebaseapp.com",
    databaseURL: "https://snake-envy.firebaseio.com",
    projectId: "snake-envy",
    storageBucket: "snake-envy.appspot.com",
    messagingSenderId: "982667962287"
};
firebase.initializeApp(config);
export default firebase