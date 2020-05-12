export const getGameColor = game => {
    if (game.hasWon) return '#68b684';
    else if (game.hasLost) return '#eb4646';
    else return '#d2d2d2';
};
