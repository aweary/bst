const BinarySearchTree = require('../index')
const _ = require('lodash')

describe('BinarySearchTree', () => {
  describe('insert', () => {
    it('should insert into an empty tree', () => {
      const tree = new BinarySearchTree()
      const key = 54345
      tree.insert(key)
      expect(tree.root.key).toEqual(key)
      expect(tree.root.left).toBeNull()
      expect(tree.root.right).toBeNull()
    })
    it('should insert into a non-empty tree', () => {
      const tree = new BinarySearchTree()
      const key1 = 54345
      const key2 = 3425
      tree.insert(key1)
      tree.insert(key2)
      expect(tree.root.key).toEqual(key1)
      expect(tree.root.left.key).toEqual(key2)
      expect(tree.root.right).toBeNull()
    })
  })
  describe('find', () => {
    it('should find a key', () => {
      const tree = new BinarySearchTree()
      tree.insert(5);
      tree.insert(1);
      tree.insert(4);
      tree.insert(3);
      expect(tree.find(4).key).toEqual(4);
    })
    it('should return null for non-existant keys', () => {
      const tree = new BinarySearchTree()
      tree.insert(5);
      tree.insert(1);
      tree.insert(4);
      tree.insert(3);
      expect(tree.find(400)).toBeNull();
    })
  })
  describe('traverse', () => {
    it('should do in-order traversal', () => {
      const tree = new BinarySearchTree()
      const keys = [234, -0, 5, 4, 14];
      keys.forEach(key => tree.insert(key));
      const sortedKeys = [];
      tree.traverse(key => sortedKeys.push(key));
      expect(sortedKeys).toEqual(_.sortBy(keys));
    })
  })
})
