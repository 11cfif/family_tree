import React, {Component, PropTypes} from 'react'
import Modal from 'react-modal';
import {customStyles} from '../../constants/Modal'
import Person from '../../objects/Person'

let name;
let surname;
let birthday;
let deathday;

class EditPersonModal extends Component {

	render() {
		const {data, buttonText, okClick, closeClick} = this.props;
		return (
			<Modal 
				isOpen={true}
				onRequestClose={closeClick}
				style={customStyles}
			>
				<div className='modal'>
					<div className='PerModal'>
						<h2 ref='subtitle'>{data.title}</h2>
						<div>Пожалуйста, введите/отредактируйте необходимую информацию о человеке.</div>
						<form onSubmit={e => {
							e.preventDefault();
							var person = new Person(name.value, surname.value, birthday.value, deathday.value, data.person.id);
							if (data.familyInfo != null && data.familyInfo != {}) {
								okClick(data.familyInfo, person);
							} else {
								okClick(person)
							}
							closeClick();
						}}>
							<ul>
								<li className='inputLi'>
									<label>Имя:</label>
									{getInput(data.edit, data.person.name, 'Иван', node => {
										name = node
									})}
								</li>

								<li className='inputLi'>
									<label>Фамилия:</label>
									{getInput(data.edit, data.person.surname, 'Иванов', node => {
										surname = node
									})}
								</li>

								<li className='inputLi'>
									<label>Дата рождения:</label>
									{getInput(data.edit, data.person.birthday, '06.12.1852', node => {
										birthday = node
									})}
								</li>

								<li className='inputLi'>
									<label>Дата смерти:</label>
									{getInput(data.edit, data.person.deathday, '31.08.1923', node => {
										deathday = node
									})}
								</li>

								<li className='buttonLi'>
									<button className='submitBut' type='submit'>
										<span className='glyphicon glyphicon-star' aria-hidden='true'/>
										{buttonText}
									</button>
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

function getInput(edit, defaultValue, placeholder, refFunction) {
	if (edit)
		return <input defaultValue={defaultValue} ref={refFunction}/>;
	return <input placeholder={placeholder} ref={refFunction}/>
}

EditPersonModal.propTypes = {
	data: PropTypes.object.isRequired,
	buttonText: PropTypes.string.isRequired,
	okClick: PropTypes.func.isRequired,
	closeClick: PropTypes.func.isRequired
};

export default EditPersonModal
