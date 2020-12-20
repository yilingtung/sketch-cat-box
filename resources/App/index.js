import React, { useState } from 'react';

import catImage from '../../assets/tiger.png';
import getBullshit from '../requests/getBullshit';

import Button from '../components/Button';
import InputField from '../components/InputField';

import styles from './index.css';

const App = () => {
	const [loading, changeLoading] = useState(false);
	const [value, setVaue] = useState('');
	const [min, setMin] = useState(20);

	const saveClick = async () => {
		changeLoading(true);
		const data = await getBullshit(value, min);
		if (data) {
			window.postMessage('changeText', data);
		}
		changeLoading(false);
	};

	return (
		<div className={styles.app}>
			<div className={styles.header}>
				<div className={styles.photo} style={{ backgroundImage: `url(${catImage})` }} />
				<div className={styles.content}>
					<div className={styles.title}>文案產生器</div>
					<div className={styles.description}>唬爛客戶的好夥伴(ﾉ◕ヮ◕)ﾉ</div>
				</div>
			</div>
			<div className={styles.content}>
				<InputField
					label="Topic"
					placeholder="請輸入你ㄉ主題名稱"
					value={value}
					onChange={(e) => setVaue(e.target.value)}
				/>
				<InputField
					label="Length"
					placeholder="請輸入字數 (上限 1000 字)"
					value={min}
					onChange={(e) => setMin(e.target.value)}
				/>
			</div>
			<Button
				isLoading={loading}
				onClick={() => {
					if (loading) {
						return;
					}
					saveClick();
				}}
			>
				Generate
			</Button>
		</div>
	);
};

export default App;
