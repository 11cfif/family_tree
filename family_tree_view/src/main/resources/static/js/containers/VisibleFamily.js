import { connect } from 'react-redux'
import Family from '../components/Family'

const getVisibleFamily = (persons) => {
	return persons
};

const mapStateToProps = (state) => {
	console.log('visible = ' + JSON.stringify(state));

	console.log('visible = ' + JSON.stringify(state.family))
	return {
		isEmpty: state.family.isEmpty,
		familyName: state.family.familyName,
		description: state.family.description,
		persons: getVisibleFamily(state.family.persons),
		isFetching: state.family.isFetching
	}
};

const VisibleFamily = connect(mapStateToProps)(Family)

export default VisibleFamily
