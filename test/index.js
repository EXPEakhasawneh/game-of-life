const assert = require('chai').assert;
const main = require('../index');

describe('Game of Life suite', function() {
    before(function() {
        it('should return the initial point (0, 0)', function() {
            assert.deepEqual(main.initialCell(), [1, [0, 0]]);
        });
    });

    it('should validate the shape of any point to be [state: bool, tuple:[x-axis, y-axis]]', function () {
        assert.deepEqual(main.pointShape(main.initialCell()), true);
    });

    it('return true for tuple', function () {
        assert.deepEqual(main.checkTuple([0, 0]), true);
    });

    it('return false for tuple', function () {
       assert.deepEqual(main.checkTuple({tuple: [0, 0, 0]}), false);
    });

    it('return the neighbor state', function () {
        assert.deepEqual(main.getStateOfCell([1, [0, 0+1]]), 1);
    });
});
