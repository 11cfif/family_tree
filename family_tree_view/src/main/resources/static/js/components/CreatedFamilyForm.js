import React, {PropTypes} from 'react'
import {
	TITLE, NAME_INPUT, DESCRIPTION_INPUT
} from '../constants/FamilyForm'

let name;
let description;

let candleClick = (e, onCreated) => {
	e.preventDefault();
	if (!name.value.trim() || !description.value.trim()) {
		return
	}
	onCreated({name, description});
}

const CreatedFamilyForm = ({onCreated}) => (
	<form className="familyForm" onSubmit={e => candleClick(e, onCreated)}>
		<fieldset>
			<label>{TITLE}</label>
			<label>{NAME_INPUT}</label>
			<input className="formData" placeholder='Семья Петровых'
			       ref={node1 => {name = node1}}/>
			<label>{DESCRIPTION_INPUT}</label>
			<input className="formData" placeholder='Семейное древо Иванова Ивана Ивановича'
			       ref={node2 => {description = node2}}/>
		<button type="submit"> Создать семью.</button>
		</fieldset>
	</form>
)

CreatedFamilyForm.propTypes = {
	onCreated: PropTypes.function.isRequired
};

export default CreatedFamilyForm
