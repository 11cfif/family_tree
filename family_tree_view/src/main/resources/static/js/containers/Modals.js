import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {createFamilyHeadModal, createEditFamilyModal, createEditPersonModal, createSpouseModal, createChildModal, createSelectSpouseModal, closeModal} from '../actions/Modal'
import {fetchFamily, loadFetchFamily, updateFetchFamily, deleteFetchFamily} from '../actions/Family'
import {fetchUpdatePerson, fetchSpouse, fetchChild, selectSpouse, changeSpouse} from '../actions/Person'
import {PERSON_MODAL, NODE_MODAL, EDIT_FAMILY_INFO_MODAL, FAMILY_INFO_MODAL, SELECT_SPOUSES_MODAL,NULL_MODAL } from '../constants/Modal'
import {HEAD, SPOUSE, CHILD} from '../constants/Person'
import PersonModal from '../components/modals/EditPersonModal'
import EditFamilyModal from '../components/modals/EditFamilyModal'
import FamilyModal from '../components/modals/FamilyModal'
import NodeModal from '../components/modals/NodeModal'
import SpousesSelectModal from '../components/modals/SelectSpousesModal'
import FamilyInfo from '../objects/FamilyInfo'

// SelectSpousesModal
export function createSelectSpouseMod(node) {
	return (dispatch) => {
		dispatch(createSelectSpouseModal(node))
	}
}

export function selectPerson(selectedId) {
	return (dispatch) => {
		dispatch(selectSpouse(selectedId))
	}
}

export function changePerson(selectedId) {
	return (dispatch) => {
		dispatch(changeSpouse(selectedId))
	}
}

//FamilyModal
export function createEditFamilyMod(familyInfo) {
	return (dispatch) => {
		dispatch(createEditFamilyModal(familyInfo));
	}
}

export function loadFamily(familyId) {
	return (dispatch) => {
		dispatch(loadFetchFamily(familyId));
	}
}

export function deleteFam(familyId) {
	return (dispatch) => {
		dispatch(deleteFetchFamily(familyId));
	}
}

// EditFamilyModal
export function updateFam(name, description, head, id) {
	console.log('updateFam = ' + name);
	console.log('updateFam = ' + JSON.stringify(head, null , 4));
	return (dispatch) => {
		dispatch(updateFetchFamily(new FamilyInfo(name, description, head, id)))
	}
}

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

export function createChildMod(node) {
	return (dispatch) => {
		dispatch(createChildModal(node))
	}
}

export function createSpouseMod(descendant) {
	return (dispatch) => {
		dispatch(createSpouseModal(descendant))
	}
}

export function updatePerson(person) {
	return (dispatch) => {
		dispatch(fetchUpdatePerson(person))
	}
}

export function createSpouse(familyId, descendantId, spouse) {
	return (dispatch) => {
		dispatch(fetchSpouse(familyId, descendantId, spouse))
	}
}

export function createChild(familyId, descendantId, spouseId, child) {
	return (dispatch) => {
		dispatch(fetchChild(familyId, descendantId, spouseId, child))
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
		const {type, data, familyId, closeMod} = this.props;

		switch (type) {
		case PERSON_MODAL:
			let okClick;
			let buttonText;
			if (data.relationType != null) {
				switch (data.relationType) {
				case HEAD:
					okClick = this.props.createFam;
					buttonText = 'Создать семью';
					break;
				case SPOUSE:
					okClick = (spouse) => this.props.createSpouse(familyId, data.person.id, spouse);
					buttonText = 'Создать cупруга(у)';
					break;
				case CHILD:
					okClick = (child) => this.props.createChild(familyId, data.node.descendant.id, data.node.getSpouse().id, child);
					buttonText = 'Создать Ребёнка(у)';
				}
			} else {
				buttonText = 'Внести изменения';
				okClick = this.props.updatePerson;
			}
			return (<PersonModal
				data={data}
				buttonText={buttonText}
				okClick={okClick}
				closeClick={closeMod}/>
			);
		case EDIT_FAMILY_INFO_MODAL:
			return (<EditFamilyModal
				data = {data}
				okClick = {(data.familyInfo) ? this.props.updateFam : this.props.createHeadPersonMod }
				closeClick = {closeMod}/>
			);
		case NODE_MODAL:
			return (<NodeModal
				data = {data}
				personClick = {this.props.createEditPersonMod}
				addChildClick = {this.props.createChildMod}
				addSpouseClick = {this.props.createSpouseMod}
				changeClick = {this.props.createSelectSpouseMod}
				closeClick = {closeMod} />
			);
		case SELECT_SPOUSES_MODAL:
			return (<SpousesSelectModal
				data = {data}
			    personClick = {this.props.selectPerson}
			    editClick = {this.props.createEditPersonMod}
			    changeClick = {this.props.changePerson}
			    closeClick = {closeMod} />
			);
		case FAMILY_INFO_MODAL:
			return (<FamilyModal
				data = {data}
				familyClick = {this.props.createEditFamilyMod}
				loadClick = {this.props.loadFamily}
				deleteClick = {this.props.deleteFam}
				closeClick = {closeMod} />
			);
		case NULL_MODAL:
		default:
			return (<div></div>);
		}
	}
}

//noinspection JSUnresolvedVariable
Modals.propTypes = {
	data: PropTypes.object.isRequired,
	type: PropTypes.string.isRequired,
	familyId: PropTypes.number.isRequired
};


const mapStateToProps = (state) => {
	return {
		data: state.modal.modalData,
		type: state.modal.modalType,
		familyId: state.family.familyInfo == null ? -1 : state.family.familyInfo.id
	}
};

Modals = connect(
	mapStateToProps,
	{
		createEditFamilyMod, loadFamily, deleteFam, 
		createHeadPersonMod, updateFam, createFam, //EditFamilyModal
		createEditPersonMod, createSelectSpouseMod, createChildMod, createSpouseMod, updatePerson, createSpouse, createChild, //NodeModal
		selectPerson, changePerson, //SelectSpousesModal
		closeMod
	}
)(Modals);


export default Modals
