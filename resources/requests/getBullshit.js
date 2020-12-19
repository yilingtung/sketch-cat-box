
const getBullshit = async (text, length) => {
	try {
		const data = await fetch('https://api.howtobullshit.me/bullshit', {
			method: 'POST',
			body: JSON.stringify({
				MinLen: parseInt(`${length}`, 20),
				Topic: text,
			}),
		})
		.then(response => response.text())
		.then(text => text);

		return data.replace(/&nbsp;/g, '');
	} catch (e) {
		console.log(e);
		return '';
	}
};

export default getBullshit;
