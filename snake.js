// gaming concept : init, draw, update, loop, setInterval(), clearInterval()
function init(){
    
    // console.log("Init");
     canvas = document.getElementById('mycanvas');
     pen = canvas.getContext('2d');
     W = canvas.width;
     H = canvas.height;
     game_over = false;
     
     food = getRandomFood();
     score = 5;
     
     
     snake = {
         init_length:5,
         color:"yellow",
         cells:[],
         direction:"right",
         
         createSnake:function(){
             for(var i=this.init_length-1;i>=0;i--){
                 this.cells.push({x:i,y:0});//cells is array of obj 
             }
         },
         drawSnake:function(){
             
             for(var i=0;i<this.cells.length;i++){
                 pen.fillStyle = this.color;//snake color
                 
                 pen.strokeStyle = "black";//create border in every box
                 pen.lineWidth  = 5;// snake border width
                 
                 pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);// give the outline to the box
                 pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);  // create rectangle
             }
             
         },
         updateSnake:function(){
             var headX = this.cells[0].x;
             var headY = this.cells[0].y;
             
             //Assuming Snake is moving right
             //Insertion at head;
            // nextHeadX = headX+1;
             
             //this.cells.unshift({x:nextHeadX,y:headY});
             
             if(headX==food.x && headY==food.y){
                 food = getRandomFood();
                 score++;//if snake eat food its length inc by 1
             }
             else{
                 //Pop last cell if food not eaten
                 this.cells.pop();
             }
             
             
             
             if(this.direction =="right"){//if we press right arrow of keyboard
                 nextX = headX + 1;//its x coordinate inc by 1 and y will be as it is
                 nextY = headY;
             }
             else if(this.direction=="left"){
                 nextX = headX-1;
                 nextY = headY;
             }
             else if(this.direction=="down"){
                 nextX = headX;
                 nextY = headY + 1;
             }
             else{
                 nextX = headX;
                 nextY = headY - 1;
             }
             //Insert the new cell at head/front
             this.cells.unshift({x:nextX,y:nextY});
             
             
             //Find out the last coordinate (boundaries)
             var last_x = Math.round(W/10);
             var last_y = Math.round(H/10);
             
             if(this.cells[0].y<0 || this.cells[0].x <0|| this.cells[0].x>last_x || this.cells[0].y>last_y){
                     alert("GameOver");
                     game_over = true;
                 
             }
             
             
             
         }
     };
     snake.createSnake();
     
     //Add Event listeners to our game
     //Listen for keyboard events.
     
     function KeyPressed(e){

         
         if(e.key=="ArrowRight"){
             snake.direction = "right";
         }
         else if(e.key=="ArrowLeft"){
             snake.direction = "left";
         }
         else if(e.key=="ArrowDown"){
             snake.direction = "down";
         }
         else{
             snake.direction = "up";
         }
         
     }
     
     
     document.addEventListener('keydown',KeyPressed);
     
 }
 
 function draw(){
     pen.clearRect(0,0,W,H);
     snake.drawSnake();
    //  console.log("In draw");
     
     //Lets us draw the food
     
     pen.fillStyle = food.color;
     
     pen.fillRect(food.x*10,food.y*10,10,10);//we want that food position( x and y coordinate) will be multiple of 10 
     
     pen.fillStyle = "white";
     pen.font = "14px Roboto";
     pen.fillText("Score : "+score,10,10);
     
     
     
 }
 
 function update(){
     snake.updateSnake();
    
 }
 
 function gameLoop(){
     draw();
     update();
     
     if(game_over==true){
         clearInterval(f);
     }
 }
 
 function getRandomFood(){
     //we are creating food position random but but it should be multiple of 10 so do /10 and and want that food position dont
     //go outside of width its can only appear till its boundry (not within it) so do it W-10 (10 is food width)
     var foodX = Math.round(Math.random()*(W-10)/10);
     var foodY = Math.round(Math.random()*(H-10)/10);
     
     foodColors = ["red","green","aqua","coral","orchid"];
     var i = Math.round(Math.random()*foodColors.length);//genrating food random color
     
     
     
     var food = {
         x:foodX,
         y:foodY,
         color:foodColors[i],
     };
     
     return food;
 }
 
 init();
 //Call Game Looper after t time
 var f = setInterval(gameLoop,100);
 