import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Family from '../components/Family'
import FamilyList from '../components/FamilyList'
import {FAMILY_LIST_SCREEN_TYPE, FAMILY_SCREEN_TYPE} from '../constants/Screen'

import {
	createNodeModal, createFamilyModal
} from '../actions/Modal'

export function createNodeMod(node) {
	return (dispatch) => {
		dispatch(createNodeModal(node))
	}
}

export function createFamilyMod(familyInfo) {
	return (dispatch) => {
		dispatch(createFamilyModal(familyInfo))
	}
}

class WorkScreen extends Component {
	render() {
		const { type, family, familyList, createNodeMod, createFamilyMod} = this.props;
		switch (type){ 
		case FAMILY_SCREEN_TYPE:
			return (<Family
				familyInfo = {family.familyInfo}
				tree = {family.tree}
				nodeClick = {createNodeMod} />);
		case FAMILY_LIST_SCREEN_TYPE:
			return (<FamilyList
				families = {familyList}
				familyClick = {createFamilyMod} />);
		default:
			return (<div></div>);
		
		}
	}
}

//noinspection JSUnresolvedVariable
WorkScreen.propTypes = {
	type: PropTypes.string.isRequired,
	familyList: PropTypes.array.isRequired,
	family: PropTypes.object.isRequired,
	createNodeMod: PropTypes.func.isRequired,
	createFamilyMod: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		family: state.family,
		familyList: state.familyList,
		type: state.screenType
	}
};

WorkScreen = connect(
	mapStateToProps,
	{createNodeMod, createFamilyMod}
)(WorkScreen);

export default WorkScreen
