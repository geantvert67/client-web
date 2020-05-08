import React, { useState, createContext, useContext, useEffect } from 'react';
import { getById } from '../service/configuration';

const ConfigContext = createContext();

export const ConfigProvider = ({ configId, children }) => {
    const [config, setConfig] = useState(null);

    useEffect(() => {
        getById(configId).then(res => setConfig(res.data));
    }, []);

    return (
        <ConfigContext.Provider value={{ config, setConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => useContext(ConfigContext);
