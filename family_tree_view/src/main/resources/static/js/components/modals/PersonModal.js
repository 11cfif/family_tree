import React, {Component, PropTypes} from 'react'
import Modal from 'react-modal';
import {customStyles} from '../../constants/Modal'
import Person from '../../objects/Person'

let name;
let surname;
let birthday;
let deathday;

class PersonModal extends Component {

	render() {
		const {data, buttonText, okClick, closeClick} = this.props;
		console.log('PERSON MODAL ' + okClick);
		return (
			<Modal
				isOpen={true}
				onRequestClose={close}
				style={customStyles}
			>
				<div className='modal'>
					<h2 ref='subtitle'>{data.title}</h2>
					<div>Пожалуйста, введите/отредактируйте необходимую информацию о главе семьи.</div>
					<form onSubmit={e => {
							e.preventDefault();
							var person = new Person(name.value, surname.value, birthday.value, deathday.value);
							{(data.familyInfo != null || data.familyInfo != {}) ? 
								okClick(data.familyInfo, person) : okClick(person);
							}
						}}>
						<ul>
							<li className='inputLi'>
								<label>Имя:</label>
								<input placeholder='Иван' value={data.person.name}
								       ref={node => {name = node}}/>
							</li>
							<li className='inputLi'>
								<label>Фамилия:</label>
								<input placeholder='Иванов' value={data.person.surname}
								       ref={node => {surname = node}}/>
							</li>
							<li className='inputLi'>
								<label>Дата рождения:</label>
								<input placeholder='06.12.1852' value={data.person.birthday}
								       ref={node => {birthday = node}}/>
							</li>
							<li className='inputLi'>
								<label>Дата смерти:</label>
								<input placeholder='31.08.1923' value={data.person.deathday}
								       ref={node => {deathday = node}}/>
							</li>
							<li className='buttonLi'>
								<button className='submitBut' type='submit'>{buttonText}</button>
								<button className='closeBut' onClick={closeClick}>Отмена</button>
							</li>
						</ul>
					</form>
				</div>
			</Modal>
		);
	}
}

PersonModal.propTypes = {
	data: PropTypes.object.isRequired,
	buttonText: PropTypes.string.isRequired,
	okClick: PropTypes.func.isRequired,
	closeClick: PropTypes.func.isRequired
};

export default PersonModal
