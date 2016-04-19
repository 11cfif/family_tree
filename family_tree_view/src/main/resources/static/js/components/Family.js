import React, {PropTypes} from 'react'
import Person from './Person'

const Family  = ({familyName, persons}) => {

console.log('Family = ' + JSON.stringify(persons))
	// var {temp} = persons.length > 0 ? persons.map(pers => <Person {...pers}/>) : <p>К сожалению никого пока нет</p>;
	return(<div>
		<h1> Семья {familyName}:</h1>
		{persons.map(pers => <Person {...pers}/>)}
	</div>
	)
}

Family.propTypes = {
	familyName: PropTypes.string.isRequired,
	persons: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		surname: PropTypes.string.isRequired,
		birthday: PropTypes.string.isRequired
	}).isRequired).isRequired
}

export default Family