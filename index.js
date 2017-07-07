const Node = require('./node')
const {
  LESS_THAN,
  GREATER_THAN,
  EQUAL,
  defaultComparator,
} = require('./comparator')

class BinarySearchTree {
  constructor(options) {
    // Used to store a temporary reference to a new node
    // that's being inserted, so it can be returned after
    // the recursive insertion
    this._pendingNode = null
    this.root = null
    this.comparator = options.comparator || defaultComparator
  }

  find(key, node) {
    node = typeof node === 'undefined' ? this.root : node
    if (node === null) return node
    // if (key < node.key) return this.find(key, node.left)
    switch (this.comparator(key, node.key)) {
      case LESS_THAN:
        return this.find(key, node.left)
      case GREATER_THAN:
        return this.find(key, node.right)
      case EQUAL:
        return node
      default:
        throw new Error(`Invalid comparator value returned`)
    }
  }

  /**
   * Internal implementation for insert
   * @param {Node} root 
   * @param {Node} node 
   */
  $insert(root, key) {
    if (root === null) {
      this._pendingNode = new Node(key)
      return this._pendingNode
    }
    switch (this.comparator(key, root.key)) {
      case LESS_THAN:
        root.left = this.$insert(root.left, key)
        break
      case GREATER_THAN:
        root.right = this.$insert(root.right, key)
        break
    }
    return root
  }

  insert(key) {
    this.root = this.$insert(this.root, key)
    const node = this._pendingNode
    this._pendingNode = null
    return node
  }

  traverse(fn, node) {
    if (node === null) return
    node = node || this.root
    this.traverse(fn, node.left)
    fn(node.key)
    this.traverse(fn, node.right)
  }

  delete(key) {
    // @TODO implement delete for BST
  }
}

module.exports = BinarySearchTree
