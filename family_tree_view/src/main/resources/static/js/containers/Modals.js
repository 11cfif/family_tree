import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {createFamilyHeadModal, closeModal} from '../actions/Modal'
import {fetchFamily} from '../actions/Family'
import {PERSON_MODAL, NODE_MODAL, FAMILY_INFO_MODAL, NULL_MODAL /*SPOUSE_TYPE, CHILD_TYPE*/} from '../constants/Modal'
import PersonModal from '../components/modals/PersonModal'
import FamilyModal from '../components/modals/FamilyModal'
import FamilyInfo from '../objects/FamilyInfo'

export function createFam(familyInfo, head) {
	return (dispatch) => {
		dispatch(fetchFamily(familyInfo, head))
	}
}

export function createFamInfo(name, description) {
	return (dispatch) => {
		dispatch(createFamilyHeadModal(new FamilyInfo(name, description, null)))
	}
}

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
			let okClick = this.props.createFam;
			console.log('okClick ' +  this.props.createFam);
			// const {personClick} = modalData.person.name.length === 0 ?
			// 	(modalData.relationType === SPOUSE_TYPE ? this.prop.createSpouse :
			// 		(modalData.relationType === CHILD_TYPE ? this.props.createChild : this.prop.okClick)) :
			// 	this.prop.updatePerson;
			return <PersonModal data={data} buttonText = 'Создать семью' okClick = {okClick} closeClick = {closeMod}/>;
		case FAMILY_INFO_MODAL:
			return <FamilyModal data={data} okClick = {this.props.createFamInfo} closeClick = {closeMod}/>;
		case NODE_MODAL:
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
	console.log('MODALS! ' + JSON.stringify(state, null, 2));
	return {
		data: state.modal.modalData,
		type: state.modal.modalType
	}
};

Modals = connect(
	mapStateToProps,
	{createFamInfo, createFam, closeMod}
)(Modals);


export default Modals
