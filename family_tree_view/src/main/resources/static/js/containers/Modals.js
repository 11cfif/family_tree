import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {createFamilyHeadModal, createEditPersonModal, closeModal} from '../actions/Modal'
import {fetchFamily} from '../actions/Family'
import {fetchUpdatePerson} from '../actions/Person'
import {PERSON_MODAL, NODE_MODAL, FAMILY_INFO_MODAL, NULL_MODAL } from '../constants/Modal'
import PersonModal from '../components/modals/PersonEditModal'
import FamilyModal from '../components/modals/FamilyModal'
import NodeModal from '../components/modals/NodeModal'
import FamilyInfo from '../objects/FamilyInfo'

// FamilyModal
export function createHeadPersonMod(name, description) {
	return (dispatch) => {
		dispatch(createFamilyHeadModal(new FamilyInfo(name, description, null)))
	}
}

export function createFam(familyInfo, head) {
	return (dispatch) => {
		dispatch(fetchFamily(familyInfo, head))
	}
}

//NodeModal

export function createEditPersonMod(person) {
	return (dispatch) => {
		dispatch(createEditPersonModal(person))
	}
}

export function createChangeSpouseMod(person) {
	return (dispatch) => {
		dispatch(createFamilyHeadModal(new FamilyInfo(person)))
	}
}

export function createChildMod(person) {
	return (dispatch) => {
		dispatch(createFamilyHeadModal(new FamilyInfo(person)))
	}
}

export function createSpouseMod(person) {
	return (dispatch) => {
		dispatch(createFamilyHeadModal(new FamilyInfo(person)))
	}
}

export function updatePerson(person) {
	return (dispatch) => {
		dispatch(fetchUpdatePerson(person))
	}
}

//All modal
export function closeMod() {
	return (dispatch) => {
		dispatch(closeModal())
	}
}

class Modals extends Component {

	render() {
		const {type, data, closeMod} = this.props;

		switch (type) {
		case PERSON_MODAL:
			console.log('===   ' + (data.person === null));
			console.log('==  ' + (data.person == null));

			let okClick;
			let buttonText;
			if (data.person === null) {
				okClick = this.props.createFam;
				buttonText = 'Создать семью';
				data.person = {};
			} else {
				buttonText = 'Внести изменения';
				okClick = this.props.updatePerson;
			}
			return <PersonModal data = {data} buttonText = {buttonText} okClick = {okClick} closeClick = {closeMod}/>;
		case FAMILY_INFO_MODAL:
			return <FamilyModal data = {data} okClick = {this.props.createHeadPersonMod} closeClick = {closeMod}/>;
		case NODE_MODAL:
			return <NodeModal
				data = {data}
				personClick = {this.props.createEditPersonMod}
				addChildClick = {this.props.createChildMod}
				addSpouseClick = {this.props.createSpouseMod}
				changeClick = {this.props.createChangeSpouseMod}
				closeClick = {closeMod} />;
		case NULL_MODAL:
		default:
			return (<div></div>);
		}
	}
}

//noinspection JSUnresolvedVariable
Modals.propTypes = {
	data: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired
};


const mapStateToProps = (state) => {
	return {
		data: state.modal.modalData,
		type: state.modal.modalType
	}
};

Modals = connect(
	mapStateToProps,
	{
		createHeadPersonMod, createFam, //FamilyModal
		createEditPersonMod, createChangeSpouseMod, createChildMod, createSpouseMod, updatePerson, //NodeModal
		closeMod}
)(Modals);


export default Modals
