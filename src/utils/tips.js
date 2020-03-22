import React from 'react';

const autoSentence =
    'En laissant le champ vide, une valeur par défaut sera automatiquement calculée selon la configuration de la partie. ';

export const TIPS = {
    // Config des modèles
    visibilityRadius: {
        tip:
            "Distance à partir de laquelle l'élément est visible. " +
            autoSentence,
        placement: 'right'
    },
    actionRadius: {
        tip:
            "Distance à partir de laquelle le joueur peut interagir avec l'élément. " +
            autoSentence,
        placement: 'right'
    },
    waitingPeriod: {
        tip:
            "Période pendant laquelle l'élément n'est plus ramassable. " +
            autoSentence,
        placement: 'right'
    }
};
