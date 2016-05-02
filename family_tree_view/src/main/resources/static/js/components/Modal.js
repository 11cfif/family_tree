import React from 'react'
import { closeFamilyModal, createFamily } from '../actions/Modal'

let name;
let description;


let Modal = ({dispatch}) => {
	return (
		<div>
			<form onSubmit={e => {
	e.preventDefault();
	dispatch(this.prop.okClick(name.value, description.value))
	}}>
				<ul>
					<li><input placeholder='Введите название семьи'
					           ref={node1 => {name = node1}}/></li>
					<li><input placeholder='Введите описание семьи'
					           ref={node2 => {description = node2}}/></li>
					<button type='submit'>Создать</button>
					<button onClick={e => {
                            e.preventDefault();
                            {dispatch(this.prop.cancelClick())}
                        }}
					>
						Отмена
					</button>
				</ul>
			</form>
		</div>
	)
};

Modal.PropTypes = {
	okClick: (name, description) => createFamily(name, description),
	cancelClick: () => closeFamilyModal()
};

export default Modal

