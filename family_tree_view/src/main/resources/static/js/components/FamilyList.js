import React, {Component, PropTypes} from 'react'
import FamilyInfo from '../objects/FamilyInfo'
import FamilyInfoComp from './FamilyInfo'

class FamilyList extends Component {
	render() {
		const {families, familyClick} = this.props;
		console.log('FamilyList = ' + JSON.stringify(families, null, 2));
		return (
			<div>
				{(families === [])
					?
					<h2>Ни одна семья не создана</h2>
					:
					<div>
						<h1>Список семей:</h1>
						<div className='familyList'>
							{families.map(family => {
								console.log('FamilyList map family = ' + JSON.stringify(family, null, 2));

								return (<FamilyInfoComp
									key = {family.id}
									title = ''
									cssClass = 'perInFam'
									familyInfo = {family}
									familyClick = {familyClick}/>)
							})}
						</div>
					</div>
				}
			</div>)
	}
}

//noinspection JSUnresolvedVariable
FamilyList.propTypes = {
	families: PropTypes.arrayOf(PropTypes.instanceOf(FamilyInfo)).isRequired,
	familyClick: PropTypes.func.isRequired
};

export default FamilyList
