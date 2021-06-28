import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createContext } from 'react';
//

// Initialize Firebase
firebase.initializeApp({
	apiKey: 'AIzaSyBUZbyQAgAjhtF41ncL9542CVR24oyNqag',
	authDomain: 'chat-app-ba3f0.firebaseapp.com',
	projectId: 'chat-app-ba3f0',
	storageBucket: 'chat-app-ba3f0.appspot.com',
	messagingSenderId: '404954101638',
	appId: '1:404954101638:web:e03e29a17ce964a8f09e07',
	measurementId: 'G-EZ15VKMKMG',
});
//
export const Context = createContext(null);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
//

ReactDOM.render(
	<React.StrictMode>
		<Context.Provider
			value={{
				firebase,
				auth,
				firestore,
			}}
		>
			<App />
		</Context.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
