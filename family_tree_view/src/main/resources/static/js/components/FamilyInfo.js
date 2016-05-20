import React, {Component, PropTypes} from 'react'
import FamilyInfo from '../objects/FamilyInfo'
import PersonComp from './Person'

class FamilyInfoComp extends Component {
	render() {
		const {familyInfo, title, cssClass, familyClick} = this.props;
		return (
			<div>
				<p2>{title}</p2>
				<div className='familyInfo' onClick={() => {
				familyClick(familyInfo)}}>
					<ul>
						<li>{familyInfo.name}</li>
						<li>{familyInfo.description}</li>
						<li>
							<PersonComp
								cssClass={cssClass}
								title='Глава семьи'
								person={familyInfo.head}
								personClick={() => console.log('click on person in familyInfo comp')}/>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

FamilyInfoComp.propTypes = {
	title: PropTypes.string.isRequired,
	cssClass: PropTypes.string.isRequired,
	familyInfo: PropTypes.instanceOf(FamilyInfo).isRequired,
	familyClick: PropTypes.func.isRequired
};

export default FamilyInfoComp