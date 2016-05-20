import {combineReducers} from 'redux'
import family from './family'
import updateModal from './modals'
import familyList from './familyList'
import screenType from './workScreen'


const FamilyTreeApp = combineReducers({
	family,
	familyList,
	screenType,
	modal: updateModal
});

export default FamilyTreeApp
