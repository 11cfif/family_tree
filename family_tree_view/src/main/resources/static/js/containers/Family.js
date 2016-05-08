import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal';
import FamilyTree from '../components/FamilyTree'
import {createPersonModal, closePersonModal, createPerson} from '../actions/Modal'
import {
	MARRIGE_RELATION, CHILD_RELATION
} from '../constants/Tree'

let name;
let surname;
let birthday;
let deathday;
let type;

const customStyles = {
	content : {
		top                   : '50%',
		left                  : '50%',
		right                 : 'auto',
		bottom                : 'auto',
		marginRight           : '-50%',
		transform             : 'translate(-50%, -50%)'
	}
};

export function createModal(nodeId) {
	return (dispatch) => {
		dispatch(createPersonModal(nodeId))
	}
}

export function closeModal() {
	return (dispatch) => {
		dispatch(closePersonModal())
	}
}

export function createPer(name, surname, birthday, deathday, type) {
	return (dispatch) => {
		dispatch(createPerson(name, surname, birthday, deathday, type))
	}
}

class Family extends Component {
	render() {
		const {modalIsOpen, isCreated, familyName, tree,
			createModal, closeModal, createPer} = this.props;
		const isEmpty = tree.isEmpty;
		return (
			<div>
				{!isCreated ?
					<div>Семья не выбрана</div>
					:
					<div>
						<h1> Семья {familyName}:</h1>
						{ isEmpty ?
							<button onClick={() => createModal()}>Создать первого члена семьи</button>
							:
							<div>
								<FamilyTree
									isEmpty = {tree.isEmpty}
									nodes = {tree.nodes}
									edges = {tree.edges}
									activeNodeId = {tree.activeNodeId}
								    nodeClick = {createModal}
								/>
							</div>
						}
					</ div>
				}
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={close}
					style={customStyles}
				>
					<h2 ref='subtitle'>Hello</h2>
					<button onClick={closeModal}>close</button>
					<div>I am a modal</div>

					<form onSubmit={e => {
						e.preventDefault();
						createPer(name.value, surname.value, birthday.value, deathday.value, 
								type.value);
						closeModal()
					}}>
						<ul>
							<li><input placeholder='Введите имя'
							           ref={node => {name = node}}/></li>
							<li><input placeholder='Введите фамилию'
							           ref={node => {surname = node}}/></li>
							<li><input placeholder='Введите дату рождения'
							           ref={node => {birthday = node}}/></li>
							<li><input placeholder='Введите дату смерти'
							           ref={node => {deathday = node}}/></li>
							Выберете тип отношений:
							<li>
								<select ref = {node => {type = node}}>
									<option>{CHILD_RELATION}</option>
									<option>{MARRIGE_RELATION}</option>
								</select>
							</li>
							<button type='submit'>Создать</button>
						</ul>
					</form>
				</Modal>
			</div>
		)
	}
}

//noinspection JSUnresolvedVariable
Family.propTypes = {
	isCreated: PropTypes.bool.isRequired,
	familyName: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	tree: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	modalIsOpen: PropTypes.bool.isRequired,
	createModal: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	createPer: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		isCreated: state.family.isCreated,
		familyName: state.family.familyName,
		description: state.family.description,
		tree: state.family.tree,
		isFetching: state.family.isFetching,
		modalIsOpen: state.family.modalIsOpen
	}
};
Family = connect(
	mapStateToProps,
	{createModal, closeModal, createPer}
)(Family);

export default Family
