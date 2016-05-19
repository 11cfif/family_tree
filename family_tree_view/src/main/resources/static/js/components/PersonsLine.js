import React, {Component, PropTypes} from 'react'
import Person from '../objects/Person'
import PersonComp from './Person'

export const PERSONS_IN_LINE = 3;

class PersonsLine extends Component {
	render() {
		const {selectedId, spouses, personClick} = this.props;
		var style = {
			display: 'flex'
		};
		return (
			<li style={style}>
				{spouses.map((spouse, i) => {
					return (<PersonComp
						key={spouse.id}
						title=''
						cssClass={i == selectedId ? 'selPerson' : ''}
						person={spouse}
						personClick={() => personClick(i)}
					/>)
				})}
			</li>
		)
	}

}

PersonsLine.propTypes = {
	selectedId: PropTypes.number.isRequired,
	spouses: PropTypes.arrayOf(PropTypes.valueOf(Person).isRequired).isRequired,
	personClick: PropTypes.func.isRequired
}

export default PersonsLine