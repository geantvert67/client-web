import React from 'react';
import { toast } from 'react-toastify';
import { exportConfiguration } from '../../service/configuration';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function DownloadButton({ configId }) {
    const downloadConfig = () => {
        exportConfiguration(configId)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'installer.zip');
                document.body.appendChild(link);
                link.click();
            })
            .catch(() =>
                toast.error('Impossible de télécharger la configuration')
            );
    };

    return (
        <FontAwesomeIcon
            icon={faDownload}
            size="lg"
            onClick={downloadConfig}
            className="mr-2 ml-2"
        />
    );
}

export default DownloadButton;
