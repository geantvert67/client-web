import React from 'react';

const autoSentence =
    'En laissant le champ vide, une valeur par défaut sera automatiquement calculée selon la configuration de la partie. ';

export const CONFIG_TIPS = {
    // Config des modèles
    visibilityRadius: {
        tip:
            "Distance à partir de laquelle l'élément est visible. " +
            autoSentence,
        placement: 'right'
    },
    actionRadius: {
        tip:
            "Distance à partir de laquelle le joueur peut interagir avec l'élément. Ce rayon doitêtre inférieure ou égale à la taille du rayon de visibilité du même élément." +
            autoSentence,
        placement: 'right'
    },
    waitingPeriod: {
        tip:
            "Période pendant laquelle l'item n'est plus ramassable après qu'un joueur ait pris l'item. ",
        placement: 'right'
    },
    locked: {
        tip:
            "Période pendant laquelle un cristal n'est plus capturable par les ennemis après qu'il ait été capturé. ",
        placement: 'right'
    },
    inventaire: {
        tip:
            "Nombre d'items qu'un joueur peut transporter. Par défaut, la taille est de 2. ",
        placement: 'right'
    }
};

export const GENERAL_TIPS = {
    area: {
        tip: (
            <span>
                <strong> Zone de jeu</strong>
                <br /> Délimite la zone dans laquelle les joueurs pourront
                évoluer lors de la partie.
            </span>
        ),
        placement: 'right'
    },

    forbiddenArea: {
        tip: (
            <span>
                <strong> Zone interdite</strong>
                <br /> Délimite la zone dans laquelle les joueurs n'auront pas
                le droit d'aller.
            </span>
        ),
        placement: 'right'
    },

    crystal: {
        tip: (
            <span>
                <strong> Crystal </strong>
                <br /> Objet céleste que les équipes devront capturer
            </span>
        ),
        placement: 'right'
    },

    delete: {
        tip: 'Supprimer ',
        placement: 'top'
    },

    clone: {
        tip: 'Cloner la configuration ',
        placement: 'top'
    },

    mask: {
        tip: 'Masquer sur la carte',
        placement: 'top'
    },

    unmask: {
        tip: 'Afficher sur la carte',
        placement: 'top'
    },

    download: {
        tip: 'Télécharger',
        placement: 'top'
    },

    modify: {
        tip: 'Modifier les paramètres ',
        placement: 'top'
    },

    dice: {
        tip: 'Ajouter aléatoirement ',
        placement: 'top'
    }
};

export const ITEMS_TIPS = {
    // Description des items

    Sonde: {
        tip: (
            <span>
                <strong> Sonde</strong>
                <br /> Augmente le rayon de visibilité des éléments pendant un
                certain temps.
            </span>
        ),
        placement: 'right'
    },

    'Noyau protecteur': {
        tip: (
            <span>
                <strong> Noyau protecteur</strong>
                <br /> Génère un dôme de protection qui protège le joueur contre
                l’effet des items ennemis.
            </span>
        ),
        placement: 'right'
    },

    'Prsime de transfert': {
        tip: (
            <span>
                <strong> Prisme de transfert</strong>
                <br /> Transfère un item à un joueur allié.
            </span>
        ),
        placement: 'right'
    },

    Intercepteur: {
        tip: (
            <span>
                <strong> Intercepteur</strong>
                <br /> Réduit le rayon de visibilité des ééments que peuvent
                percevoir les ennemis pendant un certain temps.
            </span>
        ),
        placement: 'right'
    },

    Tempête: {
        tip: (
            <span>
                <strong> Tempête</strong>
                <br /> Modifie aléatoirement l’emplacement de l’ensemble des
                éléments.
            </span>
        ),
        placement: 'right'
    },

    'Canon à photons': {
        tip: (
            <span>
                <strong> Canon à faux thons</strong>
                <br /> Empèche le joueur qui l'active de capturer des crystaux,
                d’utiliser et/ou de prendre des items pendant une durée
                déterminée.
            </span>
        ),
        placement: 'right'
    },

    Sentinelle: {
        tip: (
            <span>
                <strong> Sentinelle</strong>
                <br /> Augmente le temps d'invulnérabilité d’un crystal capturé.
            </span>
        ),
        placement: 'right'
    },

    'Portail de transfert': {
        tip: (
            <span>
                <strong>Portail de transfert</strong>
                <br /> Augmente la taille de l’inventaire du joueur qui
                l'utilise.
            </span>
        ),
        placement: 'right'
    },

    Oracle: {
        tip: (
            <span>
                <strong> Oracle</strong>
                <br /> Rend le prochain crystal capturé incapturable par les
                ennemis jusqu'à la fin de la partie.
            </span>
        ),
        placement: 'right'
    },

    Disloqueur: {
        tip: (
            <span>
                <strong> Disloqueur</strong>
                <br /> Remet l'ensemble des crystaux dans un état neutre.
            </span>
        ),
        placement: 'right'
    },

    Transducteur: {
        tip: (
            <span>
                <strong> Transducteur</strong>
                <br /> Vole un item au joueur l'activant et donne l'item à celui
                ayant posé le transducteur.
            </span>
        ),
        placement: 'right'
    },

    Transporteur: {
        tip: (
            <span>
                <strong> Transporteur</strong>
                <br /> Augmente la taille de l'inventaire du joueur l'activant.
            </span>
        ),
        placement: 'right'
    },

    Antenne: {
        tip: (
            <span>
                <strong> Antenne</strong>
                <br /> Révèle au joueur la position d'un crystal pendant
                quelques secondes.
            </span>
        ),
        placement: 'right'
    }
};
