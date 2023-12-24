import { useEffect, useState } from "react";
import TransactionsTable from "./tabels/TransactionsTable";
import useDatabase from "../../database/useDatabase"
import CurrenciesTable from "./tabels/CurrenciesTable";

const MainPage = () => {
  const [currencies, setCurrencies] = useState<{
    name: string,
    inBTC: string,
    code: string,
    id: string
  }[]>([])

  const [transactions, setTransactions] = useState<{
    id: string,
    email: string,
    wallet: string,
    from: { code: string }
    to: { code: string }
  }[]>([])

  const db = useDatabase();

  useEffect(() => {

    db.getData('currencies').then(data => {
      console.log(data);

      setCurrencies(data);
    })

    db.getData('transactions').then(data => {
      setTransactions(data);
    })
  }, [])

  return <div>
    <p>Currencies</p>
    <CurrenciesTable currencies={currencies} />
    <p>Transactions</p>

    <TransactionsTable transactions={transactions} />

  </div>
}

export default MainPage