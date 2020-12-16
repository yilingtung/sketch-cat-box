import React, { useState } from'react';
import ReactDOM from 'react-dom';
import getBullshit from './requests/getBullshit';

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
		<div>
			<input onChange={e => setVaue(e.target.value)} value={value} />
			<input onChange={e => setMin(e.target.value)} value={min} />
			<button onClick={saveClick}>save</button>
		</div>
	);
}

ReactDOM.render(<App />, document.getElementById('app'));