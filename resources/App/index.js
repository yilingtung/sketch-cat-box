import React, { useState } from'react';

import getBullshit from '../requests/getBullshit';

import styles from './index.css';

const App = () => {
	const [value, setVaue] = useState('');
	const [min, setMin] = useState(10);

	const saveClick = async () => {
		const data = await getBullshit(value, min);
		if (data){
			window.postMessage('changeText', data);
		}
	}

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<div>img</div>
				<div className={styles.content}>
					<div className={styles.title}>文案產生器</div>
					<div className={styles.description}>唬爛客戶的好夥伴(ﾉ◕ヮ◕)ﾉ</div>
				</div>
			</div>
			<input onChange={e => setVaue(e.target.value)} value={value} />
			<input onChange={e => setMin(e.target.value)} value={min} />
			<button onClick={saveClick}>save</button>
		</div>
	);
}

export default App;
