import React, { createContext, useContext, useState } from 'react';
import initialState from '.';


export type Transaction = {
  id: string;
  currencyFromCode: string;
  currencyToCode: string;
  currencyValue: string;
  wallet: string;
  rate: string;
  user: string;
}

export interface IContext {
  updateState: (newValues: { [key: string]: any }) => void;
  transactions: Transaction[]
}

const AppContext = createContext<IContext>(initialState);

const { Provider } = AppContext;

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setValues] = useState<IContext>(initialState);

  const updateState = (newValues: { [key: string]: string }) => {
    setValues({ ...state, ...newValues });
  };

  return <Provider value={{ ...state, updateState }}>{children}</Provider>;
};

export const useAppContext = () => useContext(AppContext);

export default AppContextProvider;
