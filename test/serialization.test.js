const assert = require('assert')
const {
  serializeOperation, deserializeOperation,
  serializeRemotePosition, deserializeRemotePosition
} = require('../lib/serialization')

suite('serialization/deserialization', () => {
  test('inserts', () => {
    const op = {
      type: 'insert',
      opId: {site: 1, seq: 2},
      text: 'hello',
      leftDependencyId: {site: 1, seq: 1},
      offsetInLeftDependency: {row: 0, column: 5},
      rightDependencyId: {site: 1, seq: 1},
      offsetInRightDependency: {row: 0, column: 5},
    }

    assert.deepEqual(deserializeOperation(serializeOperation(op)), op)
  })

  test('deletes', () => {
    const op = {
      type: 'delete',
      opId: {site: 1, seq: 3},
      leftDependencyId: {site: 1, seq: 1},
      offsetInLeftDependency: {row: 0, column: 5},
      rightDependencyId: {site: 1, seq: 1},
      offsetInRightDependency: {row: 0, column: 5},
      maxSeqsBySite: {
        '1': 3,
        '2': 5
      }
    }

    assert.deepEqual(deserializeOperation(serializeOperation(op)), op)
  })

  test('undo', () => {
    const op = {
      type: 'undo',
      opId: {site: 1, seq: 3},
      undoCount: 3
    }

    assert.deepEqual(deserializeOperation(serializeOperation(op)), op)
  })

  test('remote position', () => {
    const position = {
      siteId: 1,
      leftDependencyId: {site: 1, seq: 1},
      offsetInLeftDependency: {row: 0, column: 5},
      rightDependencyId: {site: 1, seq: 1},
      offsetInRightDependency: {row: 0, column: 5},
    }
    assert.deepEqual(deserializeRemotePosition(serializeRemotePosition(position)), position)
  })
})