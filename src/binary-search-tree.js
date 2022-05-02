const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  rootNode = null;

  root() {
    return this.rootNode;
  }

  add(data) {
    const createNode = (parent) => {
      if (data < parent.data && parent.left === null) {
        parent.left = new Node(data);
      } else if (data < parent.data && parent.left !== null) {
        createNode(parent.left);
      } else if (data > parent.data && parent.right === null) {
        parent.right = new Node(data);
      } else if (data > parent.data && parent.right !== null) {
        createNode(parent.right);
      }
    };

    if (this.rootNode === null) {
      this.rootNode = new Node(data);
    } else {
      createNode(this.rootNode);
    }
  }

  has(data) {

    const isPresent = node => {
      if (node === null) {
        return false;
      }
      if (data === node.data) {
        return true;
      }

      if (data < node.data) {
        return isPresent(node.left);
      } else if (data > node.data) {
        return isPresent(node.right);
      }
    }

    return isPresent(this.rootNode);
  }

  find(data) {
    const findNode = node => {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        return node;
      }

      if (data < node.data) {
        return findNode(node.left);
      } else if (data > node.data) {
        return findNode(node.right);
      }
    }

    return findNode(this.rootNode);
  }

  remove(d) {
    
    //возвращает обновленную ветку с удаленным узлом
    const removeNode = (node, data) => {
      if (node === null) {
        return null;
      }
      if (data === node.data && node.left === null && node.right === null) {
        return null;
      } else if (data === node.data && node.left !== null && node.right === null) {
        return node.left;
      } else if (data === node.data && node.left === null && node.right !== null) {
        return node.right;
      } else if (data === node.data && node.left !== null && node.right !== null) {
        let minRightNode = node.right;
        //находим мин райт без левой ветки
        while (minRightNode.left) {
          minRightNode = minRightNode.left;
        }
        //перекладываем значение мин райт дата в удаляемый узел
        node.data = minRightNode.data;
        // удаляем мин райт ноде из правой ветки 
        node.right = removeNode(node.right, minRightNode.data);
        return node;
      } else if (data > node.data) {
        node.right = removeNode(node.right, data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      }
    };

    this.rootNode = removeNode(this.rootNode, d);
  }

  min() {
    if (this.rootNode === null) return null;

    const getLeft = node => {
      return node.left ? getLeft(node.left) : node;
    }

    return getLeft(this.rootNode).data;
  }

  max() {

    if (this.rootNode === null) return null;

    const getRight = node => {
      return node.right ? getRight(node.right) : node;
    }

    return getRight(this.rootNode).data;
  }
}

module.exports = {
  BinarySearchTree
};