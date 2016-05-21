import React, {PropTypes} from 'react'

const MenuItem = ({text, onClick}) => (
	<li onClick = {() => onClick(text)}>
		<a href='#'>{text}</a>
	</li>
);
//		<a href='#'><span className='glyphicon glyphicon-search' aria-hidden='true'/>{text}</a>


//noinspection JSUnresolvedVariable
MenuItem.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default MenuItem

