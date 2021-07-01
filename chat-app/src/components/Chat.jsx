// import React, {useContext, useState} from 'react';
// import {useAuthState} from 'react-firebase-hooks/auth';
// // import {Button, Container, Grid} from '@material-ui/core';
// // import {TextField, Avatar} from '@material-ui/core';
// // import {useState} from 'react';

import { Avatar, Container, Grid, TextField, Button } from '@material-ui/core';
import { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import Loader from './Loader';
import firebase from 'firebase/app';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core';
// import { useContext, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { Context } from '..';
// import Loader from './Loader';

// import { Container, Grid } from '@material-ui/core';

// import { useContext, useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { Context } from '..';
// import Loader from './Loader';

// import {Context} from "../index";

// import { Avatar, Button, Container, Grid } from '@material-ui/core';

function Chat() {
	const { auth, firestore } = useContext(Context);
	const [user] = useAuthState(auth);
	const [value, setValue] = useState('');
	const [messages, loading] = useCollectionData(
		firestore.collection('messages').orderBy('createdAt')
	);
	const outSpace = value.trim();
	const sendMessage = async () => {
		firestore.collection('messages').add({
			uid: user.uid,
			displayName: user.displayName,
			photoURL: user.photoURL,
			text: value,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setValue('');
	};
	console.log(messages);
	//
	if (loading) {
		return <Loader />;
	}

	//

	//
	function timeSet(message) {
		const time = new Date(message.createdAt * 1000);
		const hours = time.getHours();
		const second = time.getMinutes();
		return <p>{hours + ':' + second}</p>;
	}

	// function timeSet(message) {
	//     const time = new Date(message.createdAt.seconds * 1000)
	//     const hours = time.getHours()
	//     const second = time.getMinutes()
	//     console.log(hours + ':' + second)
	//
	// }

	return (
		<div>
			<Container>
				<Grid
					container
					justyfy={'center'}
					style={{ height: window.innerHeight - 50, marginTop: '5px' }}
				>
					<div
						style={{
							width: '80%',
							height: '70vh',
							border: '1px solid gray',
							overflowY: 'auto',
						}}
					>
						{messages.map((message) => (
							<div
								className='container'
								style={{
									margin: '10px',
									marginLeft: user.uid === message.uid ? 'auto' : '40px',
									width: 'fit-content',
									padding: '5px',
								}}
							>
								<div className={'boxImg'}>
									<Avatar
										src={message.photoURL}
										alt='avatar'
										className={'img'}
									/>
								</div>
								<div className='message-orange'>
									<p className='message-content'>{message.text}</p>
									<div className='message-timestamp-right'>
										{timeSet(message)}
									</div>
								</div>
							</div>
						))}
					</div>

					<Grid
						container
						direction={'column'}
						alignItems={'flex-end'}
						style={{
							width: '80%',
						}}
					>
						<TextField
							rowMax={2}
							variant={'outlined'}
							fullWidth
							value={value}
							onChange={(e) => setValue(e.currentTarget.value)}
							onKeyPress={(e) => {
								if (e.key === 'Enter' || outSpace === true) {
									sendMessage();
								} else {
									return;
								}
							}}
						/>
						<Button onClick={sendMessage} variant={'outlined'}>
							Send
						</Button>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}

export default Chat;
