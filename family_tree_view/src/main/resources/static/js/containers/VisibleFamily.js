import { connect } from 'react-redux'
import Family from '../components/Family'

const getVisibleFamily = (persons) => {
	return persons
}

const mapStateToProps = (state) => {
	console.log('VisibleFamily map' +  JSON.stringify(state))
	let o = {
		familyName: 'Tests',
		persons: getVisibleFamily(state.persons)
	}
	return o
}

const VisibleFamily = connect(mapStateToProps)(Family)

export default VisibleFamily
