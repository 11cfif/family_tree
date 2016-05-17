import React, {Component, PropTypes} from 'react'
import Modal from 'react-modal';
import {customStyles} from '../../constants/Modal'

let name;
let description;

class FamilyModal extends Component {

	render() {
		const {okClick, closeClick} = this.props;
		return (
			<Modal
				isOpen={true}
				onRequestClose={close}
				style={customStyles}
			>
				<div className='modal'>
					<h2 ref='subtitle'>Некоторые сведения о вашей семье:</h2>
					<div>Пожалуйста, введите название семьи и её краткое описание.</div>
					<form onSubmit={e => {
							e.preventDefault();
							okClick(name.value, description.value);
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
								<button className='closeBut' onClick={closeClick}>Отмена</button>
							</li>
						</ul>
					</form>
				</div>
			</Modal>
		);
	}
}

FamilyModal.propTypes = {
	data: PropTypes.object.isRequired,
	okClick: PropTypes.func.isRequired,
	closeClick: PropTypes.func.isRequired
};

export default FamilyModal
