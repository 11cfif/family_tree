import React from 'react'
import { connect } from 'react-redux'
import MenuButton from '../components/MenuItem'
import {
	FIRST_BUTTON, SECOND_BUTTON, THIRD_BUTTON
} from '../constants/LeftMenu'


let f = (text, dispatch) => {
	alert(text);
	dispatch
};

let LeftMenu = ({dispatch}) => {
	return (
		<div>
			<nav >
				<ul className='LMenu'>
					<MenuButton text = {FIRST_BUTTON} onClick = {() => f(this.text, dispatch)}/>
					<MenuButton text = {SECOND_BUTTON} onClick = {() => f(this.text, dispatch)} />
					<MenuButton text = {THIRD_BUTTON} onClick = {() => f(this.text, dispatch)} />
				</ul>
			</nav>
		</div>
	)
};


LeftMenu = connect()(LeftMenu);

export default LeftMenu
