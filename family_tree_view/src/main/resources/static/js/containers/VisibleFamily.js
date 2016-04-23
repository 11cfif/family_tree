import { connect } from 'react-redux'
import Family from '../components/Family'

const getVisibleFamily = (persons) => {
	return persons
};

const mapStateToProps = (state) => {
	console.log('visible = ' + state)
	return {
		familyName: 'Tests',
		persons: getVisibleFamily(state.persons)
	}
};

const VisibleFamily = connect(mapStateToProps)(Family)

export default VisibleFamily
