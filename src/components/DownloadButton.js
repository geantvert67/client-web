import React from 'react';

function DownloadButton() {
    return (
        <>
            <div className="center">
                <a href="../dockerTest.tar" download>
                    Télécharger la configuration
                </a>
            </div>
        </>
    );
}

export default DownloadButton;
