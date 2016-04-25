import React, {PropTypes} from 'react'

const MenuItem = ({text, onClick}) => (
	<li className='LBut' onClick = {() => onClick(text)}>
		{text}
	</li>
);

MenuItem.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default MenuItem

