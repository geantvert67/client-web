import React from 'react';

const autoSentence =
    'En laissant le champ vide, une valeur par défaut sera automatiquement calculée selon la configuration de la partie. ';

export const TIPS = {
    // Description des items
    sonde: {
        tip: (
            <span>
                <strong> Sonde</strong>
                <br /> Augmente le rayon de visibilité des éléments pendant un
                certain temps.
            </span>
        ),
        placement: 'bottom',
        image: 'sonde.png'
    },

    noyau: {
        tip: (
            <span>
                <strong> Noyau protecteur</strong>
                <br /> Génère un dôme de protection qui protège le joueur contre
                l’effet des items ennemis.
            </span>
        ),
        placement: 'bottom',
        image: 'sonde.png'
    },

    prisme: {
        tip: (
            <span>
                <strong> Prisme de transfert</strong>
                <br /> Transfère un item à un joueur allié.
            </span>
        ),
        placement: 'bottom',
        image: 'sonde.png'
    },

    intercepteur: {
        tip: (
            <span>
                <strong> Intercepteur</strong>
                <br /> Réduit le rayon de visibilité des ééments que peuvent
                percevoir les ennemis pendant un certain temps.
            </span>
        ),
        placement: 'bottom',
        image: 'intercepteur.gif'
    },

    tempete: {
        tip: (
            <span>
                <strong> Tempête</strong>
                <br /> Modifie aléatoirement l’emplacement de l’ensemble des
                éléments.
            </span>
        ),
        placement: 'bottom',
        image: 'sonde.png'
    },

    canon: {
        tip: (
            <span>
                <strong> Canon à faux thons</strong>
                <br /> Empèche le joueur qui l'active de capturer des crystaux,
                d’utiliser et/ou de prendre des items pendant une durée
                déterminée.
            </span>
        ),
        placement: 'bottom',
        image: 'turret.png'
    },

    sentinelle: {
        tip: (
            <span>
                <strong> Sentinelle</strong>
                <br /> Augmente le temps d'invulnérabilité d’un crystal capturé.
            </span>
        ),
        placement: 'bottom',
        image: 'sentinelle.png'
    },

    portail: {
        tip: (
            <span>
                <strong>Portail</strong>
                <br /> Augmente la taille de l’inventaire du joueur qui
                l'utilise.
            </span>
        ),
        placement: 'bottom',
        image: 'portail.png'
    },

    oracle: {
        tip: (
            <span>
                <strong> Oracle</strong>
                <br /> Rend le prochain crystal capturé incapturable par les
                ennemis jusqu'à la fin de la partie.
            </span>
        ),
        placement: 'bottom',
        image: 'sonde.png'
    },

    disloqueur: {
        tip: (
            <span>
                <strong> Disloqueur</strong>
                <br /> Remet l'ensemble des crystaux dans un état neutre.
            </span>
        ),
        placement: 'bottom',
        image: 'disloqueur.gif'
    },

    transducteur: {
        tip: (
            <span>
                <strong> Transducteur</strong>
                <br /> Vole un item au joueur l'activant et donne l'item à celui
                ayant posé le transducteur.
            </span>
        ),
        placement: 'bottom',
        image: 'sonde.png'
    },

    antenne: {
        tip: (
            <span>
                <strong> Antenne</strong>
                <br /> Révèle au joueur la position d'un crystal pendant
                quelques secondes.
            </span>
        ),
        placement: 'bottom',
        image: 'antenne.png'
    },

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
