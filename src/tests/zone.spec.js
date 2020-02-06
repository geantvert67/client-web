import { isInZone } from '../utils';

describe('Zone', () => {
    it('Le point est dans la zone', () => {
        // Given
        const zone = [
            [48.52896869415842, 7.734380364418031],
            [48.53159750487597, 7.7364832162857065],
            [48.52977156163669, 7.740420699119569],
            [48.528712910695226, 7.738757729530335]
        ];
        const point = [48.52982840132963, 7.73738443851471];

        // When
        const isInside = isInZone(point[0], point[1], zone);

        // Then
        expect(isInside).toBeTruthy();
    });

    it('Le point est en dehors de la zone', () => {
        // Given
        const zone = [
            [48.52896869415842, 7.734380364418031],
            [48.53159750487597, 7.7364832162857065],
            [48.52977156163669, 7.740420699119569],
            [48.528712910695226, 7.738757729530335]
        ];
        const point = [48.531199639586056, 7.731682062149049];

        // When
        const isInside = isInZone(point[0], point[1], zone);

        // Then
        expect(isInside).toBeFalsy();
    });
});
