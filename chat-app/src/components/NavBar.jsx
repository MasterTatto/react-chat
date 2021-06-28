import React, { useContext } from 'react';
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core';
import { LOGIN_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';
import firebase from 'firebase/app';
//
function NavBar() {
	const { auth } = useContext(Context);
	const [user] = useAuthState(auth);
	console.log(user);
	//
	const login = async () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		const { user } = await auth.signInWithPopup(provider);
		console.log(user);
	};
	//
	return (
		<AppBar position='static'>
			<Toolbar variant={'dense'}>
				<Grid container justify={'flex-end'}>
					{user ? (
						<Button onClick={() => auth.signOut()} variant='outlined'>
							Exit
						</Button>
					) : (
						<NavLink to={LOGIN_ROUTE}>
							<Button onClick={login} variant='outlined'>
								Login
							</Button>
						</NavLink>
					)}
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default NavBar;
