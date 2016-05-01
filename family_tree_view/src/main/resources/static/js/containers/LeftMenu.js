import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import {createFamilyModal} from '../actions/Modal'
import MenuButton from '../components/MenuItem'
import Modal from '../components/Modal'
import {
	FIRST_BUTTON, SECOND_BUTTON, THIRD_BUTTON
} from '../constants/LeftMenu'


let f = (text) => {
	alert(text);
};

let LeftMenu = ({modal, firstButtonClick}) => {
	return (
		<div>
			<nav >
				<ul className='LMenu'>
					<MenuButton text = {FIRST_BUTTON} onClick = {() => firstButtonClick(<Modal/>)}/>
					<MenuButton text = {SECOND_BUTTON} onClick = {() => f(this.text)} />
					<MenuButton text = {THIRD_BUTTON} onClick = {() => f(this.text)} />
				</ul>
			</nav>
			{modal}
		</div>
	);
};

LeftMenu.propTypes = {
	modal: PropTypes.object.isRequired,
	firstButtonClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		firstButtonClick: (modal) => dispatch(createFamilyModal(modal))
	}
};

const mapStateToProps = (state) => {
	return {
		modal: state.modal
	}
};

LeftMenu = connect(
	mapStateToProps,
	mapDispatchToProps
)(LeftMenu);


export default LeftMenu
