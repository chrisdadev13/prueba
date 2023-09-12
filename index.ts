interface Node {
  id: number;
  name: string;
  parent: number;
  children: Node[];
}

const data: Node[] = [
  { id: 1, name: "Mascotas", parent: 0, children: [] },
  { id: 2, name: "Gato", parent: 1, children: [] },
  { id: 3, name: "Perro", parent: 1, children: [] },
  { id: 4, name: "Plantas", parent: 0, children: [] },
  { id: 5, name: "Árbol", parent: 4, children: [] },
  { id: 6, name: "Flores", parent: 4, children: [] },
  { id: 7, name: "Micu", parent: 2, children: [] },
  { id: 8, name: "Sasy", parent: 2, children: [] },
  { id: 9, name: "Fido", parent: 3, children: [] },
  { id: 10, name: "Bobby", parent: 3, children: [] },
  { id: 11, name: "Roble", parent: 5, children: [] },
];

function create_tree(data: Node[], parentId = 0) {
  const result = [];
  for (const node of data) {
    if (node.parent === parentId) {
      const children = create_tree(data, node.id);
      if (children.length) {
        node.children = children;
      }
      result.push(node);
    }
  }
  return result;
}

function insert_children(dataList: Node[], parentId: number, newNode: Node) {
  for (const node of dataList) {
    if (node.id === parentId) {
      if (!node.children) {
        node.children = [];
      }
      node.children.push(newNode);
      return true;
    } else if (node.children) {
      if (insert_children(node.children, parentId, newNode)) {
        return true;
      }
    }
  }
  return false;
}

const result = create_tree(data);

const newCat: Node = { id: 12, name: "Gardfield", parent: 2, children: [] };
const newDog: Node = { id: 13, name: "Oddy", parent: 3, children: [] };

insert_children(result, 2, newCat);
insert_children(result, 3, newDog);
