import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { closeFamilyModal, createFamily } from '../actions/Modal'

let name;
let description;


let modal = ({visible, okClick, cancelClick}) => {
	var modalClass = visible ? 'modal fade in' : 'modal fade';
	var modalStyles = visible ? {display: 'block'} : {};

	return (
		<div className={modalClass} style={modalStyles}>
			<form onSubmit={e => {
	e.preventDefault();
	console.log('1111111 ' + name + ' ' + name.value);
	okClick(name.value, description.value)
	}}>
				<ul>
					<li><input placeholder='Введите название семьи'
					           ref={node1 => {name = node1}}/></li>
					<li><input placeholder='Введите описание семьи'
					           ref={node2 => {description = node2}}/></li>
					<button type='submit'>Создать</button>
					<button onClick={e => {
                            e.preventDefault()
                            {cancelClick()}
                        }}
					>
						Отмена
					</button>
				</ul>
			</form>
		</div>
	)
};

modal.propTypes = {
	visible: PropTypes.bool.isRequired,
	okClick: PropTypes.func.isRequired,
	cancelClick: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		cancelClick: () => dispatch(closeFamilyModal()),
		okClick: (name, description) => dispatch(createFamily(name, description))
	}
};

const mapStateToProps = (state) => {
	return {
		visible: state.modal.visible
	}
};

const ModalFamily = connect(
	mapStateToProps,
	mapDispatchToProps
)(modal);


export default ModalFamily

