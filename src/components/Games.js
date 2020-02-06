import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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

const Games = () => {
    return (
        <>
            <h1>Parties en attentes de joueurs</h1>
            <table>
                <tr>
                    <td>Nom de partie</td>
                    <td>Mode de jeu</td>
                    <td>Nombre de joueur</td>
                    <td>Rejoindre</td>
                </tr>
                {rows !== null &&
                    rows.map(row => (
                        <tr>
                            <td>{row.name}</td>
                            <td>{row.mode}</td>
                            <td>{row.nbrPlayeur}</td>
                            <td>
                                <Link to="/">Rejoindre</Link>
                            </td>
                        </tr>
                    ))}
            </table>
        </>
    );
};

export default Games;
