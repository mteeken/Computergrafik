/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var chipMng = null;
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
        var selfStart = this;
        raster.load('models/VierGewinnt1.dae', function(collada) {
            selfStart.gameLoaded(collada);
        });
    }

    this.gameLoaded = function(collada) {
        gameScene = collada.scene;
        gameScene.position.y = gameScene.position.y - 0.01;
        //Hide Collider-Walls
        //game.children[0].children[0].visible = false;
        world.add(gameScene);

        document.getElementById("newgame").className= "hide";
        document.getElementById("game").className= "";

        if (chipMng == undefined) {
            chipMng = new ChipManager();
        }

        chipMng.setup();
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

    this.newGame = function() {
        var worldObjects = world.children;
        
        while (world.children[0]) {
            world.remove(worldObjects[0]);
        }

        init();
        this.clearCounter();
        document.getElementById("newgame").className= "";
        document.getElementById("game").className= "hide";
        document.getElementById("gameEnd").className= "hide";
    }
    
    this.timer = function()
    {
        this.seconds = this.seconds - 1;
        if (this.seconds <= 0)
        {
            document.getElementById("timer").innerHTML= "Du hast noch " + this.seconds + " Sekunden";
            this.clearCounter();
            
            document.getElementById("game").className= "hide";
            document.getElementById("gameEnd").className= "";

            if (chipMng.getActivePlayerNumber() == 1) {
                document.getElementById("winner").innerHTML= "Spieler 2 hat gewonnen";
            } else {
                document.getElementById("winner").innerHTML= "Spieler 1 hat gewonnen";
            }
            chipMng.setActChip(null);
            new Audio("sounds/applause.mp3").play();

            return;
        }

        //Do code for showing the number of seconds here
        document.getElementById("timer").innerHTML= "Du hast noch " + this.seconds + " Sekunden";
    }


    this.onKeyDown = function(key) {
        console.log("key" + key.keyCode);
        switch (key.keyCode) {

            case 49: // Key 1
                this.newGame();
                this.setGameLevel(1);
                break;
    
            case 50: // Key 2
                this.newGame();
                this.setGameLevel(2);
                break;
                
            case 51: // Key 3
                this.newGame();
                this.setGameLevel(3);
                break;

             case 78: // New Game
                this.newGame();
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
        document.getElementById("timer").innerHTML= "Du hast noch " + this.seconds + " Sekunden";
    }
    
    this.setCounter = function(counter) {
        this.counter = counter;
    }
    
    this.clearCounter = function() {
         clearInterval(this.counter);
    }
}