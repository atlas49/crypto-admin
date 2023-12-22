
const endpoint = 'https://blockchain.info/tobtc';

const getBitcoinPrice = (bitcoinNumber = 1, currency = 'USD') => {
	const url = `${endpoint}?currency=${currency}&value=${bitcoinNumber}`;

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}
			return response.json();
		})
		.then(data => {
			console.log(data);
			// Тут ви можете обробити отримані дані
		})
		.catch(error => {
			console.error('There was a problem with the fetch operation:', error);
		});
}