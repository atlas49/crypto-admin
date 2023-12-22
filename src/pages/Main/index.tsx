import { useEffect, useState } from "react";
import useDatabase from "../../database/useDatabase"

const MainPage = () => {
	const [currencies, setCurrencies] = useState<{
		"name": string,
		"inBTC": string,
		"code": string
	}[]>([])

	const [transactions, setTransactions] = useState<{
		"email": string,
		"wallet": string,
		"from": { code: string }
		"to": { code: string }
	}[]>([])

	const db = useDatabase();

	useEffect(() => {

		db.getData('currencies').then(data => {
			setCurrencies(data);
		})

		db.getData('transactions').then(data => {
			setTransactions(data);
		})
	}, [])

	return <div>
		<p>Currencies</p>
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>In BTC</th>
					<th>Code</th>
				</tr>
			</thead>
			<tbody>
				{currencies.map(curr =>
					<tr>
						<td>{curr.name}</td>
						<td>{curr.inBTC}</td>
						<td>{curr.code}</td>
					</tr>
				)}
			</tbody>
		</table>
		<p>Transactions</p>
		<table>
			<thead>
				<tr>
					<th>email</th>
					<th>wallet</th>
					<th>from</th>
					<th>to</th>
				</tr>
			</thead>
			<tbody>
				{transactions.map(curr =>
					<tr>
						<td>{curr.email}</td>
						<td>{curr.wallet}</td>
						<td>{curr.from.code}</td>
						<td>{curr.to.code}</td>
					</tr>
				)}
			</tbody>
		</table>
	</div>
}

export default MainPage