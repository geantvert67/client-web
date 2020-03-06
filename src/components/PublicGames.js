import React from 'react';
import { useDataFromUrl } from '../utils/data';
import history from '../utils/history';
import DownloadButton from './DownloadButton';
import { cloneConfiguration } from '../service/configuration';

const PublicGames = () => {
    const { data: configurations, setData: setConfigurations } = useDataFromUrl(
        `/configs`
    );

    const handleClone = value => {
        cloneConfiguration(value)
            .then(res => {
                history.push(`/${value}/modifconfig`);
            })
            .catch(err => {});
    };
    return (
        <>
            <h1>Configuration de parties</h1>
            <table>
                <thead>
                    <tr>
                        <td>Nom de partie</td>
                        <td>Mode de jeu</td>
                        <td>Accès</td>
                        <td>Cloner</td>
                        <td>Télécharger</td>
                    </tr>
                </thead>
                <tbody>
                    {configurations !== null &&
                        configurations.map(configuration => (
                            <tr key={configuration.id}>
                                <td>{configuration.name}</td>
                                <td>{configuration.gameMode}</td>
                                <td>
                                    {configuration.isPrivate
                                        ? 'Privé'
                                        : 'Publique'}
                                </td>
                                <td>
                                    <button
                                        onClick={e => {
                                            handleClone(configuration.id);
                                        }}
                                    >
                                        Cloner
                                    </button>
                                </td>
                                <td>
                                    <DownloadButton
                                        configId={configuration.id}
                                    />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </>
    );
};

export default PublicGames;
