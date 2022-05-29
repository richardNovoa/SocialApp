import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Navbar';
import { getProfileById } from '../../actions/profile';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import Moment from 'react-moment';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
	const id = useParams();
	useEffect(() => {
		getProfileById(id);
	}, [getProfileById, id]);

	return (
		<Fragment>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<Fragment>
					<section className='container'>
						<Link to='/profiles' className='btn btn-light'>
							Back to Profiles
						</Link>
						{auth.isAuthenticated &&
							auth.loading === false &&
							auth.user._id === profile.user._id && (
								<Link to='/edit-profile' className='btn btn-dark'>
									Edit Profile
								</Link>
							)}
						<div className='profile-grid my-1'>
							<ProfileTop profile={profile} />
							<ProfileAbout profile={profile} />
							<div className='profile-exp bg-white p-2'>
								<h2 className='text-primary'>Experience</h2>
								{profile.experience.length > 0 ? (
									<Fragment>
										{profile.experience.map((exp, index) => (
											<div key={index}>
												<h3 className='text-dark'>{exp.company}</h3>
												<p>
													<Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
													{exp.to === null ? (
														' Now'
													) : (
														<Moment format='YYYY/MM/DD'>{exp.to}</Moment>
													)}
												</p>
												<p>
													<strong>Position: </strong>
													{exp.title}
												</p>
												<p>
													<strong>Description: </strong>
													{exp.description}
												</p>
											</div>
										))}
									</Fragment>
								) : (
									<p>No experience credentials</p>
								)}
							</div>
						</div>
					</section>
				</Fragment>
			)}
		</Fragment>
	);
};

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
