import {combineReducers} from 'redux'
import addPerson from './addPerson'

const FamilyTreeApp =  combineReducers({
	persons: addPerson
})

export default FamilyTreeApp
