import React from 'react';
import { AppBar, Toolbar, Grid, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
function NavBar() {
	const user = true;
	return (
		<AppBar position='static'>
			<Toolbar>
				<Grid container justify={'flex-end'}>
					{user ? (
						<Button variant='outlined'>Exit</Button>
					) : (
						<NavLink to={LOGIN_ROUTE}>
							<Button variant='outlined'>Login</Button>
						</NavLink>
					)}
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default NavBar;
