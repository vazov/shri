(function (root) {
    
    //render solution
    var map = root.maze.MAZE_Y
    var path = root.maze.solution(map, 1, 0, -1);
    var s = maze.render(map, path);
    document.querySelector('.outer').innerHTML = s.innerHTML;
    
    //visualization section
    var nTick = 100; 
    var start = true; 
    var myTimeout; // timer id
    
    //start-stop button 
    function startStop() 
    {
    	start = !start;
    	document.getElementById("start").value = start ? "Start" : "Stop";
    	if(start) clearInterval(myTimeout); // stop
    	else // start
    	{
    	  // launch partlyPath function with every nTick 
    	  myTimeout = setInterval(partlyPath, nTick);
        }
    };
    
    //find and render every walked path
    var stepNum = 1; // initial number of steps
    function partlyPath()
    {
        var path = root.maze.solution(map, 1, 0, stepNum);
        var flag = root.flag;
        var div_obj = root.maze.render(map, path);
    	document.querySelector('.outer').innerHTML = div_obj.innerHTML;
        //increase number of steps
    	stepNum++;
 
    	if (flag) { //finish
            document.getElementById("start").value = "Start";
            clearInterval(myTimeout);
            start = true;
            stepNum = 1;
            this.flag = 0;
        }
    }
    
    root.startStop = startStop;
    
})(this); 

