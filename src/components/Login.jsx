import { Box, Button, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useContext } from 'react';
import { Context } from '../index';
import firebase from 'firebase/app';

function Login() {
	const { auth } = useContext(Context);
	//
	const login = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		const { user } = await auth.signInWithPopup(provider);
		console.log(user);
	};
	//
	return (
		<Container>
			<Grid
				container
				style={{ height: window.innerHeight - 50 }}
				alignItems='center'
				justify='center'
				color='red'
				fontSize='30px'
			>
				<Grid
					style={{ width: 400, background: 'lightgray' }}
					container
					alignItems={'center'}
					direction={'column'}
				>
					<Box p={5}>
						<Button onClick={login} variant={'outline'}>
							Sing with Google
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
}

export default Login;
