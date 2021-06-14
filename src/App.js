import React from 'react'
import './App.css';

//Loads the Firebase SDK 
import firebase from 'firebase/app';
//Database
import 'firebase/firestore';
//Authentication
import 'firebase/auth'

import { useAuthState }      from 'react-firebase-hooks/auth';
import { useCollectionData }  from 'react-firebase-hooks/firestore';
import { useState } from 'react/cjs/react.production.min';

firebase.initializeApp({
  //Config Information Firebase console
    apiKey: "AIzaSyDWfqQ5N2hpU9IJVaQq6W0uUYVh-d-LRGI",
    authDomain: "superchat-75a7f.firebaseapp.com",
    projectId: "superchat-75a7f",
    storageBucket: "superchat-75a7f.appspot.com",
    messagingSenderId: "961545000043",
    appId: "1:961545000043:web:17dc7c785a674ee4760d2e",
    measurementId: "G-C3V2K20VFP"

})

const auth = firebase.auth();
const firestore = firebase.firestore();


function App() {
  const [user] = useAuthState(auth);
  //When signed in, user is an object, else is null

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <section>
        {/* If user is defined show chat, else show sign in */}
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button onClick={signInWithGoogle}>Sign in with Google </button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>

  )

}

function ChatRoom() {
  const messegesRef = firestore.collection('messages');
  const query = messegesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});
  //listens for changes in the database collection in real time

  const [formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    e.preventDefault();

    const {uid, photoURL} = auth.currentUser;

    await messegesRef.add({
      //writes the passed json to the database
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    //Resets the form for new messages 
    setFormValue('');
  }

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={ (e) => setFormValue(e.target.value)} />
        <button type="submit">🕊</button>
      </form>
    </>
  )

}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>

    </div>
  )
}

export default App;
