import React, {PropTypes} from 'react'
import Person from './Person'

const Family  = ({familyName, persons}) => {
	// var {temp} = persons.length > 0 ? persons.map(persons => <Person {...persons}/>) : <p>К сожалению никого пока нет</p>;
	return(<div>
		<h1> Семья {familyName}:</h1>
		{persons.persons.map(per => <Person key = {per.id} {...per}/>)}
	</div>
	)
};

Family.propTypes = {
	familyName: PropTypes.string.isRequired,
	persons: PropTypes.shape({
		persons: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
			surname: PropTypes.string.isRequired,
			birthday: PropTypes.string.isRequired
		}).isRequired).isRequired,
		isFetching: PropTypes.bool.isRequired
	}).isRequired
};

export default Family