import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../actions/post';
import { useParams } from 'react-router';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';

const Post = ({ getPost, post: { post, loading }, match }) => {
	const { id } = useParams();
	useEffect(() => {
		getPost(id);
	}, [getPost]);

	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<div className='container'>
				<Link to='/posts' className='btn'>
					Back To Posts
				</Link>
				<PostItem key={post._id} post={post} showActions={false} />
			</div>
		</Fragment>
	);
};

Post.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ post: state.post });

export default connect(mapStateToProps, { getPost })(Post);
