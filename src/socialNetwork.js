export class socialNetwork {
  constructor() {
    this.adjacencyList = new Map();
  }
  addPerson(name) {
    this.adjacencyList.set(name, []);
  }
  addConnection(person1, person2) {
    this.adjacencyList.get(person1).push(person2);
    this.adjacencyList.get(person2).push(person1);
  }
  getShortestPath(person1, person2) {
    const queue = [[person1]];
    const visited = new Set();
    while (queue.length > 0) {
      const path = queue.shift();
      const vertex = path[path.length - 1];
      if (vertex === person2) {
        return path;
      }
      if (visited.has(vertex)) {
        continue;
      }
      visited.add(vertex);
      for (const connection of this.adjacencyList.get(vertex)) {
        queue.push([...path, connection]);
      }
    }
    return [];
  }
  getPersons() {
    return [...this.adjacencyList.keys()];
  }
}
