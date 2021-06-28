import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import { Button, Container, Grid } from '@material-ui/core';
import { TextField, Avatar } from '@material-ui/core';
import { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import Loader from './Loader';

function Chat() {
	const { auth, firestore } = useContext(Context);
	const [user] = useAuthState(auth);
	const [value, setValue] = useState('');
	const [messages, loading] = useCollectionData(
		firestore.collection('messages').orderBy('createdAt')
	);
	//
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
	//
	if (loading) {
		return <Loader />;
	}
	//
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
								key={message.uid}
								style={{
									margin: '10px',
									border:
										user.uid === message.uid
											? '2px solid green'
											: '2px dashed red',
									marginLeft: user.uid === message.uid ? 'auto' : '10px',
									width: 'fit-content',
									padding: '5px',
								}}
							>
								<Grid container>
									<Avatar src={message.photoURL} />
									<div>{message.displayName}</div>
								</Grid>
								<div>{message.text}</div>
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
							rowsMax={2}
							variant={'outlined'}
							fullWidth
							value={value}
							onChange={(e) => setValue(e.currentTarget.value)}
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
