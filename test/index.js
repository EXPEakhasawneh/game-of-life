const chai = require('chai');
const assertArrays = require('chai-arrays');
const { assert } = chai;
chai.use(assertArrays);
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

    it('should return true for tuple', function () {
        assert.deepEqual(main.checkTuple([0, 0]), true);
    });

    it('should return false for tuple', function () {
        assert.deepEqual(main.checkTuple({tuple: [0, 0, 0]}), false);
    });

    it('should return state of Cell', function () {
        assert.deepEqual(main.getStateOfCell([1, [0, 0]]), 1);
    });

    it('should compare two points, return true if they are the same point', function () {
        assert.deepEqual(main.isEqual([0, 0], [0, 0]), true);
    });

    it('should compare two points, return false if they are not the same point', function () {
        assert.deepEqual(main.isEqual([1, 2], [1, 1]), false);
    });
    
    it('should initialise point with state equal 0 if the point is not exist', function () {
        assert.deepEqual(main.initialiseCell([1, 1]), [0, [1, 1]]);
    });
    
    it('should return Cell if it exists in the lifeList', function () {
        assert.deepEqual(main.findCellInLifeList([1, 1], [main.initialCell(), [0, [1, 1]]]), [0, [1, 1]]);
    });

    it('should false if Cell does not exist in the lifeList', function () {
        assert.deepEqual(main.findCellInLifeList([1, 1], [main.initialCell()]), false);
    });
    
    it('return list of neighbors for a given point', function () {
        /*
            p1, p2,         p3 
            p4, givenPoint, p5
            p6, p7,         p8
        */
        const expected = [
            [0, [-1, 1]], [0, [0, 1]], [0, [1, 1]],
            [0, [-1, 0]], [0, [1, 0]],
            [0, [-1, -1]], [0, [0, -1]], [0, [1, -1]]
        ];
        
        expected.map(Cell =>{
            assert.deepInclude(main.neighborsList(main.initialCell()), Cell);
        });
    });
    
    it('check for underpopulation condition, if a living cell has less than two living neighbors', function() {
        assert.equal(main.checkUnderpopulation(main.initialCell()), true);
    });
    
    it('check for stays alive condition, if a living cell has two or three living neighbors', function () {
        assert.equal(main.staysAlive(main.initialCell()), false);
    });
    
    it('check for overcrowding condition, if a living cell has more than three living neighbors', function () {
        assert.equal(main.overcrowding(main.initialCell()), false);
    });
    
    it('check a point if it\s not a living cell, return false',function () {
        assert.equal(main.isLivingCell([0, [1, 1]]), false);
    });

    it('check a point if it\s a cell, return true',function () {
        assert.equal(main.isLivingCell(main.initialCell()), true);
    });
    
    it('check for comes to life condition, if a dead cell has exactly three living neighbors', function () {
        assert.equal(main.comesToLife(main.initialCell()), false);
    });
    
    it('return the length of living neighbors cells', function () {
        assert.equal(main.neighborsLivingListLength(main.initialCell()), 0);
    });
    
    // it('should set state for each point for the next generation', function () {
    //    
    // })
});
