import {combineReducers} from 'redux'
import family from './family'
import updateModal from './newModal'


const FamilyTreeApp = combineReducers({
	family: family,
	modal: updateModal
});

export default FamilyTreeApp
