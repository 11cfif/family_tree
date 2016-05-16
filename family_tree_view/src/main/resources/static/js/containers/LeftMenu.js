import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {createFamilyModal, closeFamilyModal, createFamily} from '../actions/Modal'
import MenuItem from '../components/MenuItem'
import Modal from 'react-modal';
import FamilyInfo from '../objects/FamilyInfo';
import {
	FIRST_BUTTON, SECOND_BUTTON, THIRD_BUTTON
} from '../constants/LeftMenu'


let name;
let description;

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
		dispatch(createFamilyModal())
	}
}

export function closeModal() {
	return (dispatch) => {
		dispatch(closeFamilyModal())
	}
}

export function createFam(name, description) {
	return (dispatch) => {
		dispatch(createFamily(new FamilyInfo(name, description, null)))
	}
}

class LeftMenu extends Component {

	render() {
		var afterOpenModal = () => {this.refs.subtitle.style.color = '#f00';};
		const {modalIsOpen, createModal, closeModal, createFam} = this.props;
		return (
			<div>
				<ul className='nav'>
					<MenuItem text={FIRST_BUTTON} onClick={() => createModal()}/>
					<MenuItem text={SECOND_BUTTON} onClick={() => console.log('second button')}/>
					<MenuItem text={THIRD_BUTTON} onClick={() => console.log('second button')}/>
				</ul>
				<Modal
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={close}
					style={customStyles}
				>
					<div className='modal'>
						<h2 ref='subtitle'>Введите описание семьи:</h2>
						<div>Пожалуйста, введите название семьи и её краткое описание.</div>
						<form onSubmit={e => {
							e.preventDefault();
							createFam(name.value, description.value);
							closeModal()
						}}>
							<ul>
								<li className='inputLi'>
									<label>Название:</label>
									<input placeholder='Семья Ивановых'
									       ref={node1 => {name = node1}}/>
								</li>
								<li className='inputLi'>
									<label>Описание:</label>
									<input placeholder='Семья по отцовской линии'
									       ref={node2 => {description = node2}}/>
								</li>
								<li className='buttonLi'>
									<button className='submitBut' type='submit'>Создать</button>
									<button className='closeBut' onClick={closeModal}>Отмена</button>
								</li>
							</ul>
						</form>
					</div>
				</Modal>
			</div>
		);
	}
}

//noinspection JSUnresolvedVariable
LeftMenu.propTypes = {
	modalIsOpen: PropTypes.bool.isRequired,
	createModal: PropTypes.func.isRequired,
	closeModal: PropTypes.func.isRequired,
	createFam: PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
	return {
		modalIsOpen: state.modalIsOpen
	}
};

LeftMenu = connect(
	mapStateToProps,
	{createModal, closeModal, createFam}
)(LeftMenu);


export default LeftMenu
