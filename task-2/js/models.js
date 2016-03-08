(function (root) {
    //maze model
    function Grid(matrix) {
        this.width = matrix[0].length;
        this.height = matrix.length;
        this.nodes = this._addNodes(this.width, this.height, matrix);

    };
    
    //cell model
    function Node(x, y, walkable) {
        this.x = x;
        this.y = y;
    /**
     * Whether this node can be walked through.
     * @type boolean
     */
        this.walkable = (walkable === undefined ? true : walkable);
    }
    
    Grid.prototype._addNodes = function(width, height, matrix) {
        var i, j,
            nodes = new Array(height);
        for (i = 0; i < height; ++i) {
            nodes[i] = new Array(width);
            for (j = 0; j < width; ++j) {
                nodes[i][j] = new Node(j, i);
            }
        }

        for (i = 0; i < height; ++i) {
            for (j = 0; j < width; ++j) {
                if (matrix[i][j] == -1) {
                    // 0, false, null will be walkable
                    // while others will be un-walkable
                    nodes[i][j].walkable = false;
                }
            }
        }
        return nodes;
    };
    
    Grid.prototype.isWalkableAt = function(x, y) {
        return this.isInside(x, y) && this.nodes[y][x].walkable;
    };

    Grid.prototype.isInside = function(x, y) {
        return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
    };
    
    Grid.prototype.getNodeAt = function(x, y) {
        return this.nodes[y][x];
    };

    Grid.prototype.getNeighbors = function(node) {
        var x = node.x,
            y = node.y,
            neighbors = [],
            nodes = this.nodes;
        // ↑
        if (this.isWalkableAt(x, y - 1)) {
            neighbors.push(nodes[y - 1][x]);
        }
        // →
        if (this.isWalkableAt(x + 1, y)) {
            neighbors.push(nodes[y][x + 1]);
        }
        // ↓
        if (this.isWalkableAt(x, y + 1)) {
            neighbors.push(nodes[y + 1][x]);
        }
        // ←
        if (this.isWalkableAt(x - 1, y)) {
            neighbors.push(nodes[y][x - 1]);
        }

        return neighbors;
    };
  
    root.Grid = Grid;
  
})(this);
