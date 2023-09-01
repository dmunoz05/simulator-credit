/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, createContext } from 'react';
import { dataJson } from '../data/index';

export const FecthTypesCreditContext = createContext();

export const FecthTypesCreditProvider = ({ children }) => {  

    let data = dataJson("empty");
    const [totalData, setTotalData] = useState(data);

    useEffect(() => {
        fetch('https://feinco.com.co/wp-json/custom-api/v1/credit-types-four')
            .then(response => response.json())
            .then(data => setTotalData(data))
            .catch(error => console.error("Error inesperado: ", error));
    }, []);

    return (
        <FecthTypesCreditContext.Provider
            value={{
                totalData,
                setTotalData
            }}
        >
            {children}
        </FecthTypesCreditContext.Provider>
    );
}