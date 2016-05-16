import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal';
import FamilyTree from '../components/FamilyTree'
import PersonComp from '../components/Person'
import Person from '../objects/Person'
import FamilyInfo from '../objects/FamilyInfo'

import {
	createPersonCreatorModal, createPersonSelectorModal, closePersonModal, createPerson, selectPerson
} from '../actions/Modal'

import {
	fetchFamily
} from '../actions/Family'

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

export function createSelectorModal(nodeId) {
	return (dispatch) => {
		dispatch(createPersonSelectorModal(nodeId))
	}
}

export function createCreatorModal() {
	return (dispatch) => {
		dispatch(createPersonCreatorModal())
	}
}

export function closeModal() {
	return (dispatch) => {
		dispatch(closePersonModal())
	}
}

export function createPer(person, type, description) {
	return (dispatch) => {
		dispatch(createPerson(person, type, description))
	}
}

export function createFam(familyInfo, head) {
	return (dispatch) => {
		dispatch(fetchFamily(familyInfo, head))
	}
}

export function selectPer(id) {
	return (dispatch) => {
		dispatch(selectPerson(id))
	}
}

class Family extends Component {
	render() {
		const {personSelectorIsOpen, personCreatorIsOpen, isCreated, familyInfo, tree,
			createSelectorModal, createCreatorModal, closeModal, createPer, selectPer, createFam} = this.props;
		const isEmpty = tree.nodes == null;
		const active = tree.activeNodeId >= 0;
		return (
			<div>
				{!isCreated ?
					<h2>Семья не создана</h2>
					:
					<div>
						<h1>{familyInfo.name}:</h1>
						{ isEmpty ?
							<button onClick={createCreatorModal}>Создать первого члена семьи</button>
							:
							<div>
								<FamilyTree
									nodes = {tree.nodes}
									edges = {tree.edges}
									activeNodeId = {tree.activeNodeId}
								    nodeClick = {createSelectorModal}
								/>
							</div>
						}
					</ div>
				}
				<Modal
					isOpen={personSelectorIsOpen}
					onRequestClose={close}
					style={customStyles}
				>
					<h2 ref='subtitle'>Hello</h2>
					<button onClick={closeModal}>close</button>
					<div>I am a modal</div>
					{!active ?
						<div> Oops</div>
						:
						tree.nodes[tree.activeNodeId].spouses.map((per, i) =>
							<PersonComp
								key={i}
								person={per}
								personClick={() => selectPer(i)}
							/>
						)
					}
					<button onClick={createCreatorModal}>Создать нового члена семьи</button>
				</Modal>
				<Modal
					isOpen={personCreatorIsOpen}
					onRequestClose={close}
					style={customStyles}
				>
					<div className='modal'>
						{isEmpty ? <h2 ref='subtitle'>Создате главу семьи.</h2> : <h2 ref='subtitle'>Hello</h2>}
						<div>Пожалуйста, введите необходимую информацию о главе семьи.</div>
						<form onSubmit={e => {
							e.preventDefault();
							var person = new Person(name.value, surname.value, birthday.value, deathday.value);
							isEmpty ?
								createFam(familyInfo, person)
							: 
								createPer(person, type.value, null);
							closeModal()
						}}>
							<ul>
								<li className='inputLi'>
									<label>Имя:</label>
									<input placeholder='Иван'
									       ref={node => {name = node}}/>
								</li>
								<li className='inputLi'>
									<label>Фамилия:</label>
									<input placeholder='Иванов'
									       ref={node => {surname = node}}/>
								</li>
								<li className='inputLi'>
									<label>Дата рождения:</label>
									<input placeholder='06.12.1852'
									       ref={node => {birthday = node}}/>
								</li>
								<li className='inputLi'>
									<label>Дата смерти:</label>
									<input placeholder='31.08.1923'
									       ref={node => {deathday = node}}/>
								</li>
								{isEmpty ?
									<li className='buttonLi'>
										<button className='submitBut' type='submit'>Создать</button>
										<button className='closeBut' onClick={closeModal}>Отмена</button>
									</li>
								:
									<li>
										<select ref={node => {type = node}}>
											<option>{CHILD_RELATION}</option>
											<option>{MARRIGE_RELATION}</option>
										</select>
										<button type='submit'>Создать</button>
									</li>
								}
							</ul>
						</form>
					</div>
				</Modal>
			</div>
		)
	}
}

//noinspection JSUnresolvedVariable
Family.propTypes = {
	isCreated: PropTypes.bool.isRequired,
	familyInfo: PropTypes.instanceOf(FamilyInfo).isRequired,
	tree: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	personSelectorIsOpen: PropTypes.bool.isRequired,
	personCreatorIsOpen: PropTypes.bool.isRequired,
	createSelectorModal: PropTypes.func.isRequired,
	createCreatorModal: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	selectPer: PropTypes.func.isRequired,
	createPer: PropTypes.func.isRequired,
	createFam: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		isCreated: state.family.isCreated,
		familyInfo: state.family.familyInfo,
		tree: state.family.tree,
		isFetching: state.family.isFetching,
		personCreatorIsOpen: state.family.personCreatorIsOpen,
		personSelectorIsOpen: state.family.personSelectorIsOpen
	}
};
Family = connect(
	mapStateToProps,
	{createSelectorModal, createCreatorModal, closeModal, selectPer, createPer, createFam}
)(Family);

export default Family
