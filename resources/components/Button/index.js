import React from'react';

import styles from './index.css';

const Button = ({
	className,
	onClick = () => {},
	children,
}) => {
	return (
		<button className={styles.button} onClick={onClick}>{children}</button>
	);
}

export default Button;