import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import {setFamilyListScreen, setFamilyScreen} from '../actions/Screen'
import {createEditFamilyModal} from '../actions/Modal'
import {fetchLoadFamilies} from '../actions/Family'
import MenuItem from '../components/MenuItem'
import {
	FIRST_BUTTON, SECOND_BUTTON, THIRD_BUTTON
} from '../constants/LeftMenu'


export function createModal() {
	return (dispatch) => {
		dispatch(setFamilyScreen());
		dispatch(createEditFamilyModal());
	}
}

export function loadFamilies() {
	return (dispatch) => {
		dispatch(setFamilyListScreen());
		dispatch(fetchLoadFamilies());
	}
}

class LeftMenu extends Component {

	render() {
		const {createModal, loadFamilies} = this.props;
		return (
			<div>
				<ul className='nav'>
					<MenuItem text={FIRST_BUTTON} onClick={createModal}/>
					<MenuItem text={SECOND_BUTTON} onClick={loadFamilies}/>
					<MenuItem text={THIRD_BUTTON} onClick={() => console.log('second button')}/>
				</ul>

			</div>
		);
	}
}

//noinspection JSUnresolvedVariable
LeftMenu.propTypes = {
	createModal: PropTypes.func.isRequired,
	loadFamilies: PropTypes.func.isRequired
};


const mapStateToProps = () => {
	return {
	}
};

LeftMenu = connect(
	mapStateToProps,
	{createModal, loadFamilies}
)(LeftMenu);


export default LeftMenu