import React, {PropTypes} from 'react'

const Person = ({id, name, surname, birthday}) => (
	<div className='per' key = {id}>
		<p>{name}, {surname}</p>
		<p>{birthday}</p>
	</div>
);

Person.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	surname: PropTypes.string.isRequired,
	birthday: PropTypes.string.isRequired,
	deathday: PropTypes.string.isRequired
};

export default Person
