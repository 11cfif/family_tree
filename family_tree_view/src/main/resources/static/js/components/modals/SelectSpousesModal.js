import React, {Component, PropTypes} from 'react'
import Modal from 'react-modal';
import {customStyles} from '../../constants/Modal'
import PersonsLine, {PERSONS_IN_LINE} from '../PersonsLine'

class SelectSpousesModal extends Component {

	render() {
		const {data, personClick, editClick, changeClick, closeClick} = this.props;
		let lines = [];
		let line = [];
		for (var i = 0; i < data.spouses.length; i++) {
			line.push(data.spouses[i]);
			if (i % PERSONS_IN_LINE === PERSONS_IN_LINE - 1) {
				lines.push([...line]);
				line = []
			}
		}
		if (line.length != 0) {
			lines.push([...line])
		}
		let linesComponents = lines.map((item, i) => {
			return (<PersonsLine
				key={i}
				selectedId={(Math.floor(data.selectedId / PERSONS_IN_LINE) === i) ? (data.selectedId % PERSONS_IN_LINE) : -1}
				spouses={item}
				personClick={(rowId) => personClick(i * PERSONS_IN_LINE + rowId)}/>)
		});
		return (
			<Modal
				isOpen={true}
				onRequestClose={closeClick}
				style={customStyles}
			>
				<div className='modal'>
					<div className='spousesModal'>
						<h2 ref='subtitle'>{'Все супруги ' + data.descendant.getFullName()}</h2>
						<ul>
							{linesComponents}
							<li>
								<button onClick={() => editClick(data.spouses[data.selectedId])}> Редактировать <i className='fa fa-user fa-1x' aria-hidden='true'/></button>
								<button onClick={() => changeClick(data.selectedId)}> Выбрать <i className='fa fa-user fa-1x' aria-hidden='true'/></button>
								<button onClick={closeClick}>Отмена</button>
							</li>
						</ul>
					</div>
				</div>
			</Modal>
		);
	}
}

SelectSpousesModal.propTypes = {
	data: PropTypes.object.isRequired,
	personClick: PropTypes.func.isRequired,
	editClick: PropTypes.func.isRequired,
	changeClick: PropTypes.func.isRequired,
	closeClick: PropTypes.func.isRequired
};

export default SelectSpousesModal
