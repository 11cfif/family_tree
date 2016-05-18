import React, {Component, PropTypes} from 'react'
import Person from '../objects/Person'

class PersonComp extends Component {
	render() {
		const {person, title, cssClass, personClick} = this.props;
		return (
			<div className={cssClass}>
				<p2>{title}</p2>
				<div className='person' onClick={() => {
				personClick(person)}}>
					<ul>
						<li>{person.surname} {person.name}</li>
						<li>{person.birthday} - {person.deathday}</li>
					</ul>
				</div>
			</div>
		)
	}
}

PersonComp.propTypes = {
	title: PropTypes.string.isRequired,
	cssClass: PropTypes.string.isRequired,
	person: PropTypes.instanceOf(Person).isRequired,
	personClick: PropTypes.func.isRequired
};

export default PersonComp