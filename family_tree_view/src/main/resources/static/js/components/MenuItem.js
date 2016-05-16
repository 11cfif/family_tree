import React, {PropTypes} from 'react'

const MenuItem = ({text, onClick}) => (
	<li onClick = {() => onClick(text)}>
		<a href='#'>{text}</a>
	</li>
);

//noinspection JSUnresolvedVariable
MenuItem.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default MenuItem

