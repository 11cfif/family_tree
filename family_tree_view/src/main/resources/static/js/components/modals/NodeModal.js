import React, {Component, PropTypes} from 'react'
import Modal from 'react-modal';
import {customStyles} from '../../constants/Modal'
import PersonComp from '../Person'

class NodeModal extends Component {

	render() {
		const {data, personClick, addChildClick, addSpouseClick, changeClick, closeClick} = this.props;
		const isSpouses = data.node.getSpouse() != null;
		return (
			<Modal
				isOpen={true}
				onRequestClose={closeClick}
				style={customStyles}
			>
				<div className='modal'>
					<div className='nodeModal'>
						<h2 ref='subtitle'>{isSpouses ? 'Супружеская пара' : 'Член семьи'}</h2>
						<ul>
							{isSpouses ?
								<li>
									<PersonComp
										title='Член семьи'
										cssClass='leftPer'
										person={data.node.descendant}
										personClick={personClick}/>
									<PersonComp
										title='Супруг(а)'
										cssClass='rightPer'
										person={data.node.getSpouse()}
										personClick={personClick}/>
								</li>
								:
								<li>
									<PersonComp
										title=''
										cssClass='centerPer'
										person={data.node.descendant}
										personClick={personClick}/>
								</li>
							}
							<li>
								<button onClick={() => addChildClick(data.node)}>Добавить <i className='fa fa-child  fa-1x' aria-hidden='true'/></button>
								<button onClick={() => addSpouseClick(data.node.descendant)}>Добавить <i className='fa fa-heart fa-1x' aria-hidden='true'/></button>
								{
									data.node.spouses.length === 0 ?
										<button disabled='disabled' onClick={() => changeClick(data.node)}>
											Выбрать <i className='fa fa-heart fa-1x' aria-hidden='true'/>
										</button>
										:
										<button onClick={() => changeClick(data.node)}>
											Выбрать <i className='fa fa-heart fa-1x' aria-hidden='true'/>
										</button>
								}
								<button onClick={closeClick}>Отмена</button>
							</li>
						</ul>
					</div>
				</div>
			</Modal>
		);
	}
}

NodeModal.propTypes = {
	data: PropTypes.object.isRequired,
	personClick: PropTypes.func.isRequired,
	changeClick: PropTypes.func.isRequired,
	addSpouseClick: PropTypes.func.isRequired,
	addChildClick: PropTypes.func.isRequired,
	closeClick: PropTypes.func.isRequired
};

export default NodeModal
