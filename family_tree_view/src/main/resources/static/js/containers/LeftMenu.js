import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {createFamilyModal, closeFamilyModal, createFamily} from '../actions/Modal'
import MenuButton from '../components/MenuItem'
import Modal from 'react-modal';
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
		dispatch(createFamily(name, description))
	}
}

class LeftMenu extends Component {

	render() {
		var afterOpenModal = () => {this.refs.subtitle.style.color = '#f00';};
		const {modalIsOpen, createModal, closeModal, createFam} = this.props;
		return (
			<div>
				<nav >
					<ul className='LMenu'>
						<MenuButton text={FIRST_BUTTON} onClick={() => createModal()}/>
						<MenuButton text={SECOND_BUTTON} onClick={() => console.log('second button')}/>
						<MenuButton text={THIRD_BUTTON} onClick={() => console.log('second button')}/>
					</ul>
				</nav>
				<Modal
					isOpen={modalIsOpen}
					onAfterOpen={afterOpenModal}
					onRequestClose={close}
					style={customStyles}
				>

					<h2 ref='subtitle'>Hello</h2>
					<button onClick={closeModal}>close</button>
					<div>I am a modal</div>

					<form onSubmit={e => {
					 e.preventDefault();
					createFam(name.value, description.value);
					closeModal()
				}}>
						<ul>
							<li><input placeholder='Введите название семьи'
							           ref={node1 => {name = node1}}/></li>
							<li><input placeholder='Введите описание семьи'
							           ref={node2 => {description = node2}}/></li>
							<button type='submit'>Создать</button>
						</ul>
					</form>
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
