/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, createContext } from 'react';

export const FecthTypesCreditContext = createContext()

export const FecthTypesCreditProvider = ({ children }) => {  

    const [totalData, setTotalData] = useState([]);

    useEffect(() => {
        fetch('https://feinco.com.co/wp-json/custom-api/v1/credit-types')
            .then(response => response.json())
            .then(data => setTotalData(data))
            .catch(error => console.log('Error : ' + error));
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