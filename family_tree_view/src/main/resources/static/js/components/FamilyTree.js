import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import vis from 'vis'
import Node from '../objects/Node'
import Edge from '../objects/Edge'

class FamilyTree extends Component {

	render() {
		return <div className='tree'>
		</div>
	}

	componentDidMount() {
		this.updateTree();
	}

	componentDidUpdate () {
		this.updateTree();
	}

	updateTree() {
		var container = findDOMNode(this);

		// Options
		var options = {
			layout: {
				hierarchical: {
					direction: 'UD',
					sortMethod: 'directed',
					nodeSpacing: 300
				}
			},
			physics: {
				enabled: false
			}
		};


		let {nodes, edges, nodeClick} = this.props;
		let tree = {
			nodes: nodes,
			edges: edges
		};
		var network = new vis.Network(container, tree, options);
		network.on('click', (params) => {
			if (params.nodes.length > 0) {
				nodeClick(nodes.filter(item => item.id === params.nodes[0])[0])
			}
		});
	}
}

FamilyTree.propTypes = {
	activeNodeId: PropTypes.number.isRequired,
	nodes: PropTypes.arrayOf(PropTypes.instanceOf(Node).isRequired).isRequired,
	edges: PropTypes.arrayOf(PropTypes.instanceOf(Edge).isRequired).isRequired,
	nodeClick: PropTypes.func.isRequired
};

export default FamilyTree