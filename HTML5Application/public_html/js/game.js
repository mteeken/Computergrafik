/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var timer;
var chipMng;
var newChip;
var timeout;

function start() {
  timer.stop();
  timer.clear();
  requestAnimationFrame(start);
  //controls.update();
  renderer.render(world, camera);
}


function onKeyDown(key) {
    console.log("key" + key.keyCode);
    switch (key.keyCode) {
        
        case 37: // left
            chipMng.moveLeft();
            break;

        case 39: // right
            chipMng.moveRight();
            break;
        
        
        case 40: // Down
            var indexPosition = getIndexPosition(chipMng.getChipPosition().x);
            chipMng.moveDown(indexPosition);

            break;
    }
}

function getIndexPosition(xPosition) {
    xPosition = Math.round(xPosition * 100) / 100 ;
    
    var position = 0;
    switch (xPosition) {
        case 2.2:
            position = 0;    
            break;
        
        case 1.45:
            position = 1;
            break;
            
        case 0.7:
            position = 2;
            break;
            
        case -0.05:
            position = 3;
            break;
            
        case -0.8:
            position = 4;
            break;

        case -1.55:
            position = 5; 
            break;
            
        case -2.3:
            position = 6;
            break;
    }
    
    return position;
}

function getYPostion(arrayPosition) {
    var yPosition = 0;
    switch (arrayPosition) {
        case 5:
            yPosition = 3.5;    
            break;
            
        case 4:
            yPosition = 2.8;    
            break;
            
        case 3:
            yPosition = 2.05;
            break;
            
         case 2:
            yPosition = 1.3;
            break;
            
         case 1:
            yPosition = 0.55;
            break;    
          
        case 0:
            yPosition = -0.2;
            break;   
    }
    
    return yPosition;
}