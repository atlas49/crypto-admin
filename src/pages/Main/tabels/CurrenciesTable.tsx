import { useEffect, useState } from "react";
import useDatabase from "../../../database/useDatabase";

type CurrencyEnum = 'name' | 'code' | 'inBTC';

type Currency = {
	name: string;
	code: string;
	inBTC: string;
	id: string
}

interface TableState extends Currency {
	isUpdating: boolean;
	newState: Currency | null;
}

interface ICurrenciesTable {
	currencies: Currency[],
	addCurrencies: () => void,
	removeCurrencies: (id: string) => void

}

const CurrenciesTable = (props: ICurrenciesTable) => {
	const [tableState, setTableState] = useState<TableState[]>([]);

	const db = useDatabase();

	const update = (i: number) => {
		const newTableState = [...tableState];

		newTableState[i].isUpdating = !newTableState[i].isUpdating

		if (!newTableState[i].isUpdating) {
			db.updateData({ name: newTableState[i].name, code: newTableState[i].code, inBTC: newTableState[i].inBTC }, 'currencies', newTableState[i].id)
		}

		setTableState(newTableState)
	}

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>, i: number, prop: CurrencyEnum) => {
		const newTableState = [...tableState];
		newTableState[i][prop] = event.target.value;
		setTableState(newTableState)
	}


	useEffect(() => {
		const initArr: TableState[] = [...props.currencies].map((el) => ({ ...el, isUpdating: false, newState: null }))
		setTableState(initArr)
	}, [props.currencies])

	return <table>
		<thead>
			<tr>
				<th>name</th>
				<th>inBTC</th>
				<th>code</th>
				<th>action</th>
			</tr>
		</thead>
		<tbody>
			{tableState.map((curr, i) =>
				<tr key={i}>
					<td style={{ width: '20%' }}>{tableState[i]?.isUpdating ? <input onChange={(e) => { onChangeInput(e, i, 'name') }} value={tableState[i].name} /> : curr.name}</td>
					<td style={{ width: '20%' }}>{tableState[i]?.isUpdating ? <input onChange={(e) => { onChangeInput(e, i, 'inBTC') }} value={tableState[i].inBTC} /> : curr.inBTC}</td>
					<td style={{ width: '20%' }}>{tableState[i]?.isUpdating ? <input onChange={(e) => { onChangeInput(e, i, 'code') }} value={tableState[i].code} /> : curr.code}</td>
					<td><button onClick={() => { update(i) }}>{tableState[i]?.isUpdating ? "Save" : "Update"}</button> <button onClick={() => props.removeCurrencies(curr.id)}>Remove</button></td>
				</tr>
			)}
			<tr><button onClick={() => props.addCurrencies()}>Add</button></tr>
		</tbody>
	</table>
}

export default CurrenciesTable