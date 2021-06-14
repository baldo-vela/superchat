import React from 'react'
import './App.css';

//Loads the Firebase SDK 
import firebase from 'firebase/app';
//Database
import 'firebase/firestore';
//Authentication
import 'firebase/auth'

import { userAuthState }      from 'react-firebase-hooks/auth';
import { useCollectionData }  from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  //Config Information Firebase console
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
