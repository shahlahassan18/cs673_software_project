import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from 'firebase/auth'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAkCHdMSxL7_MqRubmKcsF60m1HP0B0upo",
    authDomain: "software-engineering-pro-3040f.firebaseapp.com",
    projectId: "software-engineering-pro-3040f",
    storageBucket: "software-engineering-pro-3040f.appspot.com",
    messagingSenderId: "144079595073",
    appId: "1:144079595073:web:7330219a753b156767c8c0",
    measurementId: "G-ZPEKWLZZ78"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
const provider = new GoogleAuthProvider()

  //Have to check DB

  export {auth, provider, storage}

  export function GoogleSignInAPIRedirect(){
    return (dispatch) =>{
        signInWithRedirect(auth, provider).then(payload => {
            console.log(payload)
        }).catch(err=>{
            console.log(err)
        })
    }
  }

