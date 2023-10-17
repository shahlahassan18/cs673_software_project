import { initializeApp } from 'firebase/app'
import {getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import { getFirestore } from 'firebase/firestore';


// const firebaseConfig = {
//     apiKey: "AIzaSyAkCHdMSxL7_MqRubmKcsF60m1HP0B0upo",
//     authDomain: "software-engineering-pro-3040f.firebaseapp.com",
//     projectId: "software-engineering-pro-3040f",
//     storageBucket: "software-engineering-pro-3040f.appspot.com",
//     messagingSenderId: "144079595073",
//     appId: "1:144079595073:web:7330219a753b156767c8c0",
//     measurementId: "G-ZPEKWLZZ78"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyCGQM0_diw6g0DL1t8mhAjLl1UR6lVdqc4",
  authDomain: "softwareengineeringproje-ce511.firebaseapp.com",
  projectId: "softwareengineeringproje-ce511",
  storageBucket: "softwareengineeringproje-ce511.appspot.com",
  messagingSenderId: "539519997261",
  appId: "1:539519997261:web:11a7ff83a73b35d8321304",
  measurementId: "G-8EJL2PFGMK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
const provider = new GoogleAuthProvider()
const db = getFirestore()

  //Have to check firestore

  export {app, auth, provider, storage, db}

  export function GoogleSignInAPIRedirect(){
    return (dispatch) =>{
        signInWithRedirect(auth, provider).then(payload => {
            console.log(payload)
        }).catch(err=>{
            console.log(err)
        })
    }
  }
  

