import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CreateProfile from './components/profile-forms/CreateProfile';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

//Redux
const App = () => {
	useEffect(() => {
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Routes>
						<Route path='/' element={<Landing />} />
						<Route path='/login' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='/profiles' element={<Profiles />} />

						<Route path='/profile/:id' element={<Profile />} />

						<Route path='/' element={<PrivateRoute />}>
							<Route path='dashboard' element={<Dashboard />} />
							<Route path='create-profile' element={<CreateProfile />} />
							<Route path='edit-profile' element={<EditProfile />} />
							<Route path='add-experience' element={<AddExperience />} />
							<Route path='add-education' element={<AddEducation />} />
						</Route>
					</Routes>
				</Fragment>
			</Router>
		</Provider>
	);
};
export default App;
