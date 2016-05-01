import React, {PropTypes} from 'react'
import Person from './Person'

const Family  = ({isEmpty, familyName, persons}) => {
	// var {temp} = persons.length > 0 ? persons.map(persons => <Person {...persons}/>) : <p>К сожалению никого пока нет</p>;
	var {temp} = <div>Семья не выбрана</div>
	if (isEmpty)
		temp;
	return (
		isEmpty ?
			<div>Семья не выбрана</div>
		:
			<div>
				<h1> Семья {familyName}:</h1>
				{persons.map(per => <Person key={per.id} {...per}/>)}
			</div>
	)
};

Family.propTypes = {
	isEmpty: PropTypes.bool.isRequired,
	familyName: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	persons: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		surname: PropTypes.string.isRequired,
		birthday: PropTypes.string.isRequired
	}).isRequired).isRequired,
	isFetching: PropTypes.bool.isRequired
};

export default Family