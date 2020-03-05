import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataFromUrl } from '../../utils/data';
import FormModifConfig from './FormModifConfig';

const ModifConfig = () => {
    const { configurationId } = useParams();

    const {
        loading: loading,
        data: configuration,
        setData: setConfiguration
    } = useDataFromUrl(`/configs/${configurationId}`);

    return (
        <>
            {loading ? (
                '...'
            ) : (
                <>
                    <h1>Choix des paramètres</h1>
                    <FormModifConfig configuration={configuration} />
                </>
            )}
        </>
    );
};

export default ModifConfig;
