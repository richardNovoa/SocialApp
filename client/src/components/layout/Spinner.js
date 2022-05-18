import { Fragment } from 'react';
import spinner from '../layout/spinner1.gif';
import React from 'react';

const Spinner = () => {
	return (
		<Fragment>
			<section className='container'>
				<img
					src={spinner}
					style={{ width: '200px', margin: 'auto', display: 'block' }}
					alt='Loading...'
				/>
			</section>
		</Fragment>
	);
};

export default Spinner;
