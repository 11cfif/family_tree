import React, {Component, PropTypes} from 'react'
import Modal from 'react-modal';
import {customStyles} from '../../constants/Modal'
import FamilyInfoComp from '../FamilyInfo'

class FamilyModal extends Component {

	render() {
		const {data, familyClick, deleteClick, loadClick, closeClick} = this.props;
		return (
			<Modal
				isOpen={true}
				onRequestClose={closeClick}
				style={customStyles}
			>
				<div className='modal'>
					<div className='familyModal'>
						<h2 ref='subtitle'>Выбранна семья</h2>
						<ul>
							<li>
								<FamilyInfoComp
									title=''
									cssClass=''
									familyInfo={data.familyInfo}
									familyClick={familyClick}/>
							</li>
							<li>
								<button
									onClick={() => {
										loadClick(data.familyInfo.id);
										closeClick();
									}}>
									Загрузить семью
								</button>
								<button 
									onClick={() => {
										deleteClick(data.familyInfo.id);
										closeClick();
									}}>
									Удалить семью
								</button>
								<button onClick={closeClick}>Отмена</button>
							</li>
						</ul>
					</div>
				</div>
			</Modal>
		);
	}
}

FamilyModal.propTypes = {
	data: PropTypes.object.isRequired,
	familyClick: PropTypes.func.isRequired,
	loadClick: PropTypes.func.isRequired,
	deleteClick: PropTypes.func.isRequired,
	closeClick: PropTypes.func.isRequired
};

export default FamilyModal
