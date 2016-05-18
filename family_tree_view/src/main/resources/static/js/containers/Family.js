import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import FamilyTree from '../components/FamilyTree'
import FamilyInfo from '../objects/FamilyInfo'

import {
	createNodeModal
} from '../actions/Modal'

export function createNodeMod(node) {
	return (dispatch) => {
		dispatch(createNodeModal(node))
	}
}

class Family extends Component {
	render() {
		const { isCreated, familyInfo, tree, createNodeMod} = this.props;
		return (
			<div>
				{!isCreated ?
					<h2>Семья не создана</h2>
					:
					<div>
						<h1>{familyInfo.name}:</h1>
						<div>
							<FamilyTree
								nodes={tree.nodes}
								edges={tree.edges}
								activeNodeId={tree.activeNodeId}
								nodeClick={createNodeMod}
							/>
						</div>
					</ div>
				}
			</div>
		)
	}
}

//noinspection JSUnresolvedVariable
Family.propTypes = {
	isCreated: PropTypes.bool.isRequired,
	familyInfo: PropTypes.instanceOf(FamilyInfo).isRequired,
	tree: PropTypes.object.isRequired,
	createNodeMod: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		isCreated: state.family.isCreated,
		familyInfo: state.family.familyInfo,
		tree: state.family.tree
	}
};
Family = connect(
	mapStateToProps,
	{createNodeMod}
)(Family);

export default Family

//
// <Modal
// isOpen={personSelectorIsOpen}
// onRequestClose={close}
// style={customStyles}
// 	>
// 	<h2 ref='subtitle'>Hello</h2>
// 	<button onClick={closeModal}>close</button>
// 	<div>I am a modal</div>
// {!active ?
// 	<div> Oops</div>
// 	:
// 	tree.nodes[tree.activeNodeId].spouses.map((per, i) =>
// 		<PersonComp
// 			key={i}
// 			person={per}
// 			personClick={() => selectPer(i)}
// 		/>
// 	)
// }
// <button onClick={createCreatorModal}>Создать нового члена семьи</button>
// </Modal>