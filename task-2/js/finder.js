(function (root) {

    function findPath(startX, startY, endX, endY, grid, stepNum) {
    
    var openList = [],
        startNode = grid.getNodeAt(startX, startY),
        endNode = grid.getNodeAt(endX, endY),
        neighbors, neighbor, node, i, l, cyclesNum;

    // push the start pos into the queue
    openList.push(startNode);
    startNode.opened = true;
    
    cyclesNum = stepNum;
    // while the queue is not empty
    while (openList.length) {
        // take the front node from the queue
        node = openList.shift();
        node.closed = true;

        // reached the end position
        if (node === endNode) {
            return backtrace(endNode, 1);
        }
        
        // only for visualization: with every step decrement number of steps
        if (cyclesNum >= 0) {
            if (cyclesNum > 0) cyclesNum--;
            // all steps done
            else {
                return backtrace(node, 0);
            }
        }
        
        neighbors = grid.getNeighbors(node);
        for (i = 0, l = neighbors.length; i < l; ++i) {
            neighbor = neighbors[i];

            // skip this neighbor if it has been inspected before
            if (neighbor.closed || neighbor.opened) {
                continue;
            }

            openList.push(neighbor);
            neighbor.opened = true;
            neighbor.parent = node;
        }
    }
    
    // fail to find the path
    root.flag = 0;
    return [];
    };
    
    // build path from end to start and the reverse
    function backtrace(node, flag) {
        //flag return 1 if we achieve out, or 0 otherwise
        root.flag = flag;
        var path = [[node.x, node.y]];
        while (node.parent) {
            node = node.parent;
            path.push([node.x, node.y]);
        }
        return path.reverse();
    };
    
    root.findPath = findPath;

})(this);
