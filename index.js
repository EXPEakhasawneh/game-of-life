function initialCell() {
    return [1, [0, 0]]
}

function initialiseCell(point) {
    return [0, point];
}

function pointShape(point) {
    return checkTuple(point) && checkTuple(point[1]);
}

function checkTuple(point) {
    return Array.isArray(point) && point.length === 2;
}

function getStateOfCell(point) {
    return point[0];
}

function isEqual(point1Coordinations, point2Coordinations) {
    return point1Coordinations[0] === point2Coordinations[0] && point1Coordinations[1] === point2Coordinations[1];
}

function findCellInLifeList(pointCoordinations, lifeList) {
    return lifeList.find(function (Cell) {
        return isEqual(pointCoordinations, Cell[1]);
    }) || false;
}

function neighborsList(pointCoordinations) {
    const neighbors = [];
    let xAxisPoint = pointCoordinations[1][0];
    let yAxisPoint = pointCoordinations[1][1];
    for (let i = xAxisPoint - 1; i <= xAxisPoint+1; i++) {
        for (let j = yAxisPoint - 1; j <= yAxisPoint+1; j++) {
            const neighborPointCoordiniations = [i, j];
            if (isEqual(pointCoordinations[1], neighborPointCoordiniations)) {
                continue;
            }
            if (!findCellInLifeList(neighborPointCoordiniations, lifeList)) {
                lifeList.push(initialiseCell(neighborPointCoordiniations));
            }
            neighbors.push(findCellInLifeList(neighborPointCoordiniations, lifeList));
        }
    }
    return neighbors;
}

function checkUnderpopulation(point) {
    return neighborsList(point).filter(point => point[0] === 1).length < 2 && isLivingCell(point);
}

function staysAlive(point) {
    const neighborsListLength = neighborsLivingListLength(point);
    return neighborsListLength === 2 || neighborsListLength === 3 && isLivingCell(point); 
}

function overcrowding(point) {
    return isLivingCell(point) && neighborsLivingListLength(point) > 3;
}

function comesToLife(point) {
    return !isLivingCell(point) && neighborsLivingListLength(point) === 3;
}

function isLivingCell(point) {
    return !!point[0];
}

function neighborsLivingListLength(point) {
    return neighborsList(point).filter(point => point[0] === 1).length;
}

const lifeList = [initialCell()];

module.exports = {
    initialCell,
    pointShape,
    checkTuple,
    getStateOfCell,
    isEqual,
    initialiseCell,
    findCellInLifeList,
    neighborsList,
    checkUnderpopulation,
    staysAlive,
    overcrowding,
    comesToLife,
    isLivingCell,
    neighborsLivingListLength,
};
