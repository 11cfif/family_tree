import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal';
import Person from '../components/Person'
import {createPersonModal, closePersonModal, createPerson} from '../actions/Modal'

let name;
let surname;
let birthday;
let deathday;

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

export function createModal() {
	return (dispatch) => {
		dispatch(createPersonModal())
	}
}

export function closeModal() {
	return (dispatch) => {
		dispatch(closePersonModal())
	}
}

export function createPer(name, surname, birthday, deathday) {
	return (dispatch) => {
		dispatch(createPerson(name, surname, birthday, deathday))
	}
}

class Family extends Component {
	render() {
		const {modalIsOpen, isCreated, familyName, persons,
			createModal, closeModal, createPer} = this.props;
		const isEmpty = persons.length === 0;
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
								{persons.map(per => <Person key={per.id} {...per}/>)}
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
						createPer(name.value, surname.value, birthday.value, deathday.value);
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
	persons: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		surname: PropTypes.string.isRequired,
		birthday: PropTypes.string.isRequired
	}).isRequired).isRequired,
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
		persons: state.family.persons,
		isFetching: state.family.isFetching,
		modalIsOpen: state.family.modalIsOpen
	}
};
Family = connect(
	mapStateToProps,
	{createModal, closeModal, createPer}
)(Family);

export default Family
