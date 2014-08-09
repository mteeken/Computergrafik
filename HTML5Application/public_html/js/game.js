/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var timer;
var chipMng;
var newChip;
var timeout;

function Game() {

    var level = 0;
    var counter;
    var seconds = 0;
    
    this.setGameLevel = function(level) {
        this.level = level;
        game.loadGame();
    }
    
    this.loadGame = function() {
        //Loading of the Game-Board
        var raster = new THREE.ColladaLoader();
        raster.options.convertUpAxis = true;
        self = this;
        raster.load('models/VierGewinnt.dae', function(collada) {
            self.gameLoaded(collada);
        });
    }

    this.gameLoaded = function(collada) {
        gameScene = collada.scene;
        gameScene.position.y = gameScene.position.y - 0.01;
        //Hide Collider-Walls
        //game.children[0].children[0].visible = false;
        world.add(gameScene);

        chipMng = new ChipManager();
        chipMng.createYellowChip();
    }


    this.start = function() {

        self = this;
        requestAnimationFrame(function() {
          self.start();
        });
        controls.update();
        renderer.render(world, camera);
    }

    this.timer = function()
    {
        this.seconds = this.seconds - 1;
        if (this.seconds <= 0)
        {
            document.getElementById("timer").innerHTML= "Noch: " + this.seconds + " secs";
            this.clearCounter();
            
            alert("Spieler " + chipMng.getActivePlayerNumber()  + " hat verloren");
            return;
        }

        //Do code for showing the number of seconds here
        document.getElementById("timer").innerHTML= "Noch: " + this.seconds + " secs";
    }


    this.onKeyDown = function(key) {
        console.log("key" + key.keyCode);
        switch (key.keyCode) {

            case 49: // Key 1
                this.setGameLevel(1);
                break;
    
            case 50: // Key 2
                this.setGameLevel(2);
                break;
                
            case 51: // Key 3
                this.setGameLevel(3);
                break;
                
            case 37: // left
                chipMng.moveLeft();
                break;

            case 39: // right
                chipMng.moveRight();
                break;


            case 40: // Down
                var indexPosition = this.getIndexPosition(chipMng.getChipPosition().x);
                chipMng.moveDown(indexPosition);

                break;
        }
    }

    this.getIndexPosition = function(xPosition) {
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

    this.getYPostion = function(arrayPosition) {
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
    
    this.getLevel = function() {
        return this.level;
    }
    
    this.setSeconds = function(seconds) {
        this.seconds = seconds;
    }
    
    this.setCounter = function(counter) {
        this.counter = counter;
    }
    
    this.clearCounter = function() {
         clearInterval(this.counter);
    }
}