import React from 'react';
import { exportConfiguration } from '../service/configuration';

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
            .catch(err => console.log(err));
    };

    return (
        <>
            <div className="center" onClick={downloadConfig}>
                <FontAwesomeIcon icon={faDownload} size="lg" />
            </div>
        </>
    );
}

export default DownloadButton;
