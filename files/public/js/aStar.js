function calcH(node, end) {
  let xDif = end[0] - node[0];
  let yDif = end[1] - node[1];
  return Math.sqrt(xDif**2 + yDif**2);
}
function nodeInList (node, list) {
  let found = false;
  list.forEach(function(currentNode) {
    if (currentNode[0] === node[0] && currentNode[1] === node[1]) {
      found = true;
    }
  });
  return found;
}
function nodeWithValue(node, list) {

  //found[2] should be infinity
  let found = [node[0], node[1], 100000];
  list.forEach(function(currentNode) {
    if (currentNode[0] == node[0] && currentNode[1] == node[1]) {
      found = currentNode;
    }
  });
  return found;
}
function updateNodeList(node, list) {
  let found = false;
  for (var i = 0; i < list.length; i++) {
    if (list[i][0] == node[0] && list[i][1] == node[1]) {
      found = true;
      list[i] = node;
    }
  }
  if (!found) {
    list.push(node);
  }
  return list;
}
function removeNodeFromList(node, list) {
  let newList = [];
  for (var i  = 0; i < list.length; i++) {
    if (list[i][0] == node[0] && list[i][1] == node[1]) {

    } else {
      newList.push(list[i]);
    }
  }
  return newList;
}
function reconstructPath(cameFrom, current, start) {
  totalPath = [current];
  let found = false;
  while (!found) {
    if (current[0] == start[0] && current[1] == start[1]) {
      found = true;
    } else {
      current = cameFrom[current[0].toString() + "," + current[1].toString()];
      totalPath.push(current);
    }

  }
  return totalPath;

}
function removeBad(badList, nodes) {
  let newList = [];
  nodes.forEach(function(node) {
    let good = true;
    badList.forEach(function(bad) {
      if (bad[0] == node[0] && bad[1] == node[1]) {
        good = false;
      }
    });
    if (good) {
      newList.push(node);
    }
  });
  return newList;
}
function aStar(nodes, start, end, width, height) {
  let nodesWithValues = [];
  //node format is [x, y, gCost (weight from start), hCost (distance from end)]
  start = [start[0], start[1], 0, calcH(start, end)];
  let openList = [start];
  let closedList = [];

  let cameFrom = {

  }
  while (openList.length != 0) {
    openList.sort(function(a,b) {
      return (a[2]+a[3]) - (b[2]+b[3]);
    });
      let currentNode = openList[0];
    if (currentNode[0] === end[0] && currentNode[1] === end[1]) {
      return (reconstructPath(cameFrom, currentNode, start));
    }
    let successorNodes = [];
    if (currentNode[0] === 0) {
      if (currentNode[1] === 0) {
        successorNodes.push([1, 0]);
        successorNodes.push([0, 1]);
      } else if (currentNode[1] === height) {
        successorNodes.push([1, currentNode[1]]);
        successorNodes.push([0, currentNode[1]-1]);
      } else {
        successorNodes.push([0, currentNode[1]-1]);
        successorNodes.push([0, currentNode[1]+1]);
        successorNodes.push([1, currentNode[1]]);
      }
    } else if (currentNode[0] === width) {
      if (currentNode[1] === 0) {
        successorNodes.push([currentNode[0]-1, 0]);
        successorNodes.push([currentNode[0], 1]);
      } else if (currentNode[1] === height) {
        successorNodes.push([currentNode[0]-1, currentNode[1]]);
        successorNodes.push([currentNode[0], currentNode[1]-1]);
      } else {
        successorNodes.push([currentNode[0]-1, currentNode[1]]);
        successorNodes.push([currentNode[0], currentNode[1]-1]);
        successorNodes.push([currentNode[0], currentNode[1]+1]);
      }
    } else if (currentNode[1] === 0) {
      successorNodes.push([currentNode[0], 1]);
      successorNodes.push([currentNode[0]-1, 0]);
      successorNodes.push([currentNode[0]+1, 0]);
    } else if (currentNode[1] === height) {
      successorNodes.push([currentNode[0], currentNode[1]-1]);
      successorNodes.push([currentNode[0]-1, currentNode[1]]);
      successorNodes.push([currentNode[0]+1, currentNode[1]]);
    } else {
      successorNodes.push([currentNode[0]-1, currentNode[1]]);
      successorNodes.push([currentNode[0]+1, currentNode[1]]);
      successorNodes.push([currentNode[0], currentNode[1]+1]);
      successorNodes.push([currentNode[0], currentNode[1]-1]);
    }
    successorNodes = removeBad(nodes, successorNodes);
    openList = removeNodeFromList(currentNode, openList);
    closedList.push(currentNode);

    for (var i  = 0; i < successorNodes.length; i++) {
      if (nodeInList(successorNodes[i], closedList)) {
        continue;
      }
      let successorCost = currentNode[2]+1;
      if (!nodeInList(successorNodes[i], openList)) {
        openList.push([successorNodes[i][0], successorNodes[i][1], successorCost, calcH(successorNodes[i], end)]);
      } else if (successorCost >= nodeWithValue(successorNodes[i], nodesWithValues)[2]) {
        continue;
      }
      cameFrom[successorNodes[i][0].toString() + "," + successorNodes[i][1].toString()] = currentNode;
      successorNodes[i] = [successorNodes[i][0], successorNodes[i][1], successorCost, calcH(successorNodes[i], end)];
      nodesWithValues = updateNodeList(successorNodes[i], nodesWithValues);
    }

  }
  return false;
}

//aStar format is aStar(badNodes, start, end, width of graph, height of graph)
