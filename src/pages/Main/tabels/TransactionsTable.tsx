type Transaction = {
    email: string;
    wallet: string;
    from: {
        code: string;
    }
    to: {
        code: string
    }
}

interface ITransactionsTable {
    transactions: Transaction[]
}

const TransactionsTable = (props: ITransactionsTable) => {
    return <table>
        <thead>
            <tr>
                <th>email</th>
                <th>wallet</th>
                <th>from</th>
                <th>to</th>
            </tr>
        </thead>
        <tbody>
            {props.transactions.map((t, i) =>
                <tr key={i}>
                    <td>{t.email}</td>
                    <td>{t.wallet}</td>
                    <td>{t.from.code}</td>
                    <td>{t.to.code}</td>
                </tr>
            )}
        </tbody>
    </table>
}

export default TransactionsTable