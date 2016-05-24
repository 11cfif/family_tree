import React, {Component, PropTypes} from 'react'
import Modal from 'react-modal';
import {customStyles} from '../../constants/Modal'

let name;
let description;

class EditFamilyModal extends Component {

	render() {
		const {data, okClick, closeClick} = this.props;
		return (
			<Modal 
				isOpen={true}
				onRequestClose={closeClick}
				style={customStyles}
			>
				<div className='modal'>
					<div className='famModal'>
						<h2 ref='subtitle'>Некоторые сведения о вашей семье:</h2>
						{data.familyInfo ?
							<div>Пожалуйста, отредактируйте название семьи и её краткое описание.</div>
							:
							<div>Пожалуйста, введите название семьи и её краткое описание.</div>
						}
						<form onSubmit={e => {
							e.preventDefault();
							if (data.familyInfo) {
							// log.co
								okClick(name.value, description.value, data.familyInfo.head, data.familyInfo.id);
								closeClick();
							} else {
								okClick(name.value, description.value);
							}
						}}>
							<ul>
								<li className='inputLi'>
									<label>Название:</label>
									{(data.familyInfo) ?
										<input defaultValue={data.familyInfo.name} ref={node => {name = node}}/>
										:
										<input placeholder='Семья Ивановых' ref={node => {name = node}}/>
									}
								</li>
								<li className='inputLi'>
									<label>Описание:</label>
									{(data.familyInfo) ?
										<input defaultValue={data.familyInfo.description} ref={node => {description = node}}/>
										:
										<input placeholder='Семья по отцовской линии' ref={node => {description = node}}/>
									}
								</li>
								
								<li className='buttonLi'>
									<button className='submitBut' type='submit'>{data.familyInfo ? 'Редактировать' : 'Создать'}</button>
									<button className='closeBut' onClick={closeClick}>Отмена</button>
								</li>
							</ul>
						</form>
					</div>
				</div>
			</Modal>
		);
	}
}

EditFamilyModal.propTypes = {
	data: PropTypes.object.isRequired,
	okClick: PropTypes.func.isRequired,
	closeClick: PropTypes.func.isRequired
};

export default EditFamilyModal
