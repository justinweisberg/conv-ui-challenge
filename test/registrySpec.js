var assert = require('assert');
var registry = require('../lib/registry.js');
describe('Registry', function() {
  describe('#assignNumber()', function() {
    before(function() {
      reg = new registry.Registry();
    });
    it('should spawn an empty registry', function() {
      assert.deepEqual([], reg.currentlyRegistered);
    });

    it('should add a new number to the registry', function() {
      assert.deepEqual([1], reg.assignNumber());
    });

    it('should add the lowest available number to the registry', function() {
      assert.deepEqual([1,2], reg.assignNumber());
      assert.deepEqual([1,2,3], reg.assignNumber());
      assert.deepEqual([1,2,3,4], reg.assignNumber());
    });
    it('should be considerate of custom numbers when assigning a new number', function() {
      reg.addCustomNumber(42);
      assert.deepEqual([1,2,3,4,5,42], reg.assignNumber());
      reg.addCustomNumber(6);
      assert.deepEqual([1,2,3,4,5,6,7,42], reg.assignNumber());
    });
  });

  describe('#addCustomNumber(customNumber)', function() {
    before(function() {
      reg = new registry.Registry();
    });
    it('should add a custom number as chosen by the user', function() {
      assert.deepEqual([10], reg.addCustomNumber(10));
    });

    it('should not allow duplicate numbers', function() {
      assert.throws(function(){reg.addCustomNumber(10)}, Error, "Error: 10 is already taken, please try again.");
    });
  });

  describe('#deleteNumber(selectedNumber)', function() {
    before(function() {
      reg = new registry.Registry();
      reg.assignNumber();
      reg.assignNumber();
      reg.addCustomNumber(42);
    });
    it('should delete the number input by the user', function() {
      assert.deepEqual([1,42], reg.deleteNumber(2));
    });
    it('should allow the users to assign previously deleted numbers', function() {
      assert.deepEqual([1,2,42], reg.assignNumber());
      assert.deepEqual([2,42], reg.deleteNumber(1));
      assert.deepEqual([1,2,42], reg.assignNumber());
      assert.deepEqual([1,2,3,42], reg.assignNumber());
      assert.deepEqual([1,2,3,4,42], reg.assignNumber());
      assert.deepEqual([1,2,3,4,5,42], reg.assignNumber());
    });
  });

});
