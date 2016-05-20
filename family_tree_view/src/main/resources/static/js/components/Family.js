import React, {Component, PropTypes} from 'react'
import FamilyTree from './FamilyTree'
import FamilyInfo from '../objects/FamilyInfo'

class Family extends Component {
	render() {
		const { familyInfo, tree, nodeClick} = this.props;
		return (
			<div>
				{(familyInfo === null) ?
					<div></div>
					:
					<div>
						<h1>{familyInfo.name}:</h1>
						<div>
							<FamilyTree
								nodes={tree.nodes}
								edges={tree.edges}
								activeNodeId={tree.activeNodeId}
								nodeClick={nodeClick}
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
	familyInfo: PropTypes.instanceOf(FamilyInfo).isRequired,
	tree: PropTypes.object.isRequired,
	nodeClick: PropTypes.func.isRequired
};

export default Family
