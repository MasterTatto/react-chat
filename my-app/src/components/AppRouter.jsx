import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
function AppRouter() {
	const user = false;
	return user ? (
		<Switch>
			{privateRoutes.map(({ path, Component }) => (
				<Route path={path} component={Component} />
			))}
			<Redirect to={CHAT_ROUTE} />
		</Switch>
	) : (
		<Switch>
			{publicRoutes.map(({ path, Component }) => (
				<Route path={path} component={Component} />
			))}
			<Redirect to={LOGIN_ROUTE} />
		</Switch>
	);
}

export default AppRouter;
