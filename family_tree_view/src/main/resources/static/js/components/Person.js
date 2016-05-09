import React, {Component, PropTypes} from 'react'
import Person from '../objects/Person'

class PersonComp extends Component {

	render() {
		const {person, personClick} = this.props
		return <div className='person' onClick={personClick}>
			<ul>
				<li>{person.surname} {person.name}</li>
				<li>{person.birthday} - {person.deathday}</li>
			</ul>
		</div>
	}

}

PersonComp.propTypes = {
	person: PropTypes.instanceOf(Person).isRequired,
	personClick: PropTypes.func.isRequired
};

export default PersonComp