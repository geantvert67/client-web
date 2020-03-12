import React from 'react';
import { useParams } from 'react-router-dom';
import { useDataFromUrl } from '../../utils/data';
import FormModifConfig from './FormModifConfig';

const CreateTeam = () => {
    const { configurationId } = useParams();

    const { loading: loading, data: configuration } = useDataFromUrl(
        `/configs/${configurationId}`
    );

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

export default CreateTeam;
