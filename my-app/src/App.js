import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Chat from './components/Chat';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
function App() {
	return (
		<BrowserRouter>
			<NavBar />

			<AppRouter />
		</BrowserRouter>
	);
}

export default App;
