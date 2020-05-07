import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
    exportConfiguration,
    getById,
    getAreas,
    updateById,
    getItemsModel,
    updateItemsModel,
    updateItem,
    getItems
} from '../../service/configuration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { getVisibilityRadiusAuto, formatZone } from '../../utils/utils';
import { IconOverlay } from '../OverlayTip';
import { Spinner } from 'react-bootstrap';

function DownloadButton({ configId }) {
    const [loading, setLoading] = useState(false);

    const configRadius = (config, zone) => {
        const newConfig = { id: config.id };
        if (!config.playerVisibilityRadius) {
            newConfig.playerVisibilityRadius = getVisibilityRadiusAuto(
                zone,
                0.05
            );
        }
        if (!config.playerActionRadius) {
            const AR = getVisibilityRadiusAuto(zone, 0.045);
            if (config.playerVisibilityRadius) {
                newConfig.playerActionRadius =
                    AR < config.playerVisibilityRadius
                        ? AR
                        : config.playerVisibilityRadius * 0.95;
            } else {
                newConfig.playerActionRadius = AR;
            }
        }
        if (!config.flagVisibilityRadius) {
            newConfig.flagVisibilityRadius = getVisibilityRadiusAuto(
                zone,
                0.05
            );
        }
        if (!config.flagActionRadius) {
            const AR = getVisibilityRadiusAuto(zone, 0.045);
            if (config.flagVisibilityRadius) {
                newConfig.flagActionRadius =
                    AR < config.flagVisibilityRadius
                        ? AR
                        : config.flagVisibilityRadius * 0.95;
            } else {
                newConfig.flagActionRadius = AR;
            }
        }

        return updateById(newConfig);
    };

    const itemModelsRadius = (config, zone) => {
        return getItemsModel(config.id)
            .then(res => {
                return Promise.all(
                    res.data.map(m => {
                        const newModel = {};
                        if (!m.visibilityRadius) {
                            newModel.visibilityRadius = getVisibilityRadiusAuto(
                                zone,
                                0.04
                            );
                        }
                        if (!m.actionRadius) {
                            const AR = getVisibilityRadiusAuto(zone, 0.035);
                            if (m.visibilityRadius) {
                                newModel.actionRadius =
                                    AR < m.visibilityRadius
                                        ? AR
                                        : m.visibilityRadius * 0.95;
                            } else {
                                newModel.actionRadius = AR;
                            }
                        }

                        return updateItemsModel(config.id, m.id, newModel);
                    })
                );
            })
            .catch(() => {
                throw 'Impossible de télécharger la configuration';
            });
    };

    const itemsRadius = (config, zone) => {
        return getItems(config.id)
            .then(res => {
                return Promise.all(
                    res.data.map(m => {
                        const newModel = {};
                        if (!m.visibilityRadius) {
                            newModel.visibilityRadius = getVisibilityRadiusAuto(
                                zone,
                                0.04
                            );
                        }
                        if (!m.actionRadius) {
                            const AR = getVisibilityRadiusAuto(zone, 0.035);
                            if (m.visibilityRadius) {
                                newModel.actionRadius =
                                    AR < m.visibilityRadius
                                        ? AR
                                        : m.visibilityRadius * 0.95;
                            } else {
                                newModel.actionRadius = AR;
                            }
                        }

                        return updateItem(config.id, m.id, newModel);
                    })
                );
            })
            .catch(() => {
                throw 'Impossible de télécharger la configuration';
            });
    };

    const calculateRadius = () => {
        return getById(configId)
            .then(res => {
                const config = res.data;

                return getAreas(configId)
                    .then(res => {
                        let zone = res.data.filter(
                            z => z.forbidden === false
                        )[0];
                        zone = formatZone(zone.position.coordinates[0]);

                        return Promise.all([
                            configRadius(config, zone),
                            itemModelsRadius(config, zone),
                            itemsRadius(config, zone)
                        ]);
                    })
                    .catch(() => {
                        throw 'Veuillez créer une zone de jeu valide';
                    });
            })
            .catch(err => {
                throw err;
            });
    };

    const downloadConfig = () => {
        setLoading(true);
        calculateRadius()
            .then(() => {
                return exportConfiguration(configId)
                    .then(res => {
                        const url = window.URL.createObjectURL(
                            new Blob([res.data])
                        );
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'installer.zip');
                        document.body.appendChild(link);
                        link.click();
                    })
                    .catch(() => {
                        throw 'Impossible de télécharger la configuration';
                    });
            })
            .catch(err => toast.error(err))
            .finally(() => setLoading(false));
    };

    return loading ? (
        <Spinner size="sm" animation="border" variant="light" />
    ) : (
        <IconOverlay tipKey="download">
            <FontAwesomeIcon
                icon={faDownload}
                size="lg"
                onClick={downloadConfig}
                className="mr-2 ml-2"
            />
        </IconOverlay>
    );
}

export default DownloadButton;
