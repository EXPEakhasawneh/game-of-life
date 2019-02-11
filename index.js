function initialCell() {
    return [1, [0, 0]]
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

module.exports = {
    initialCell,
    pointShape,
    checkTuple,
    getStateOfCell,
};
