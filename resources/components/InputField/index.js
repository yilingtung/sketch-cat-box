import React from'react';

import styles from './index.css';

const InputField = ({
	className,
	label = '',
	placeholder = '',
	value = '',
	onChange = () => {}
}) => {
	return (
		<div className={styles.inputField}>
			<div className={styles.label}>
				{label}
			</div>
			<input value={value} placeholder={placeholder} onChange={onChange} />
		</div>
	);
}

export default InputField;