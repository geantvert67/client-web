import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../utils/history';
import { useDataFromUrl } from '../utils/data';
import DownloadButton from './DownloadButton';
import { cloneConfiguration } from '../service/configuration';

/*
function createData(name, mode, nbrPlayeur) {
    return { name, mode, nbrPlayeur };
}


const rows = [
    createData('Apocalypse Now', 'Attaque et destruction', 6),
    createData('Survival Day', 'Control total', 24),
    createData('Strasbourg est en feu', 'Attaque et destruction', 10),
    createData('Peace of War', 'Cristal unique', 2),
    createData('Anarchy', 'Chacun pour soi', 10)
];
*/

const Games = () => {
    const { data: configurations, setData: setConfigurations } = useDataFromUrl(
        `/user/configs`
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
                <tr>
                    <td>Nom de partie</td>
                    <td>Mode de jeu</td>
                    <td>Accès</td>
                    <td>Modifier</td>
                    <td>Cloner</td>
                    <td>Télécharger</td>
                </tr>
                {configurations !== null &&
                    configurations.map(configuration => (
                        <tr key={configuration.id}>
                            <td>{configuration.name}</td>
                            <td>{configuration.gameMode}</td>
                            <td>
                                {configuration.isPrivate ? 'Privé' : 'Publique'}
                            </td>
                            <td>
                                <Link to={`/${configuration.id}/modifconfig`}>
                                    Modifier
                                </Link>
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
                                <DownloadButton />
                            </td>
                        </tr>
                    ))}
            </table>
        </>
    );
};

export default Games;
