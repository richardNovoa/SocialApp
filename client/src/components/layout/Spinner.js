import { Fragment } from 'react';
import spinner from '../layout/spinner1.gif';
import React from 'react';

const Spinner = () => {
	return (
		<Fragment>
			<img
				src={spinner}
				style={{ width: '200px', margin: 'auto', display: 'block' }}
				alt='Loading...'
			/>
		</Fragment>
	);
};

export default Spinner;
