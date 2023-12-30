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

  const removeTranscation = (id: string) => {
    db.deleteById('transactions', id).then(() => {
      const newTransactions = [...transactions];
      const res = newTransactions.filter(t => id !== t.id);
      setTransactions(res)
    })
  }

  const addCurrencies = () => {
    const newData = {
      name: "BTC",
      inBTC: "1",
      code: "BTC",
    }
    db.setData('currencies', newData).then((id) => {
      const newCurrencies = [...currencies];
      newCurrencies.push({ ...newData, id })
      setCurrencies(newCurrencies)
    })
  }

  const removeCurrencies = (id: string) => {
    db.deleteById('currencies', id).then(() => {
      const newCurrencies = [...currencies];
      const res = newCurrencies.filter(t => id !== t.id);
      setCurrencies(res)
    })

  }


  return <div>
    <p>Currencies</p>
    <CurrenciesTable currencies={currencies} addCurrencies={addCurrencies} removeCurrencies={removeCurrencies} />
    <p>Transactions</p>
    <TransactionsTable transactions={transactions} remove={removeTranscation} />

  </div>
}

export default MainPage