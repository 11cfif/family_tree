import React from 'react'
import { connect } from 'react-redux'
import { addPerson } from '../actions/AddPersonActions'

let nextId = 0
let AddPerson = ({dispatch}) => {
	let name;
	let surname;
	let birthday;
	// 	= {
	// 	surname:'',
	// 	name:'',
	// 	birthday:''
	// };

	return (
		<div>
			<form onSubmit = {e => {
				e.preventDefault();
				// if (!person.surname.trim() || !person.name.trim() || !person.birthday.trim()) {
				// 	return
				// }
				console.log('s===== ' + surname.value + ' =====')
				dispatch(addPerson({id:++nextId, name:name.value, surname: surname.value, birthday: birthday.value}))
			}}>
				<input className="personData" placeholder='введите Имя'
				       ref = {node1 => {name = node1}}/>
				<input className="personData" placeholder='введите Фамилию'
				       ref = {node2 => {surname = node2}}/>
				<input className="personData" placeholder='введите год рождения в формате дд/мм/гггг'
				       ref = {node3 => {birthday = node3}}/>
				<button type="submit"> Добавить человека. </button>
			</form>>
		</div>
	)
};


AddPerson = connect()(AddPerson);

export default AddPerson
