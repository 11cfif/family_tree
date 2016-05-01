import {combineReducers} from 'redux'
import family from './family'
import updateModal from './modal'


const FamilyTreeApp = combineReducers({
	family: family,
	modal: updateModal
});

export default FamilyTreeApp
