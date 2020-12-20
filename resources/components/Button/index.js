import React from'react';
import classnames from 'classnames';

import styles from './index.css';

const Button = ({
	className,
	isLoading = false,
	onClick = () => {},
	children,
}) => {
	return (
		<button
			className={classnames(styles.button, className, isLoading && styles.loading)}
			onClick={onClick}
		>
			<span className={styles.mainText}>
				{children}
			</span>
		</button>
	);
}

export default Button;