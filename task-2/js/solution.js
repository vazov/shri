(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */
    function solution(maze, x, y, stepNum) {
        // new maze model
        var m = new root.Grid(maze);
        // x coordinates of out
        var xEnd = findOut(maze);
        // trying find path for each out, if find one - return path
        var path;
        for (var i = 0; i < xEnd.length; ++i) {
            path = root.findPath(x, y, xEnd[i], maze.length-1, m, stepNum);
            if (path != []) break; 
        }
        return path;
    };
    
    //return x coordinates of out
    function findOut(maze) {
        var x, coordinates = [];
        for (x = 0; x < maze[0].length; ++x) { 
            var value = maze[maze.length - 1][x];
            if (value == 0) {
                coordinates.push(x);
            }
        }
        return coordinates;
    };

    root.maze.solution = solution;

})(this);
