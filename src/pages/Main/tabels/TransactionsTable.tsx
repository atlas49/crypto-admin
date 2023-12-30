type Transaction = {
	fromCurrency: {
		name: string | undefined;
		code: string | undefined;
	};
	toCurrency: {
		name: string | undefined;
		code: string | undefined;
	};
	created: Date;
	status: string;
	send: string | undefined;
	receive: string | undefined;
	wallet: string;
	email: string;
	id: string
}

interface ITransactionsTable {
	transactions: Transaction[],
	remove: (id: string) => void
}

const TransactionsTable = (props: ITransactionsTable) => {

	return <table>
		<thead>
			<tr>
				<th>username</th>
				<th>wallet</th>
				<th>from</th>
				<th>to</th>
				<th>send</th>
				<th>receive</th>
			</tr>
		</thead>
		<tbody>
			{props.transactions.map((t, i) =>
				<tr key={i}>
					<td>{t.email}</td>
					<td>{t.wallet}</td>
					<td>{t.fromCurrency?.code}</td>
					<td>{t.toCurrency?.code}</td>
					<td>{t.send}</td>
					<td>{t.receive}</td>
					<td><button onClick={() => props.remove(t.id)}>Remove</button></td>
				</tr>
			)}
		</tbody>
	</table>
}

export default TransactionsTable