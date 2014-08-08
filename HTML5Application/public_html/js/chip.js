/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function ChipManager()
{
    var actChip;
    var chips = new Array(7);
    var chipMoving = false;

    for (var i = 0; i < chips.length; i++) {
        chips[i] = new Array(6); 

        for (var j = 0; j < chips[i].length; j++) {
            chips[i][j] = 0;
        }
    }
    
    this.createNewChip = function()
    {
        if(actChip.name.valueOf() === 'Yellow') {
            this.createRedChip();
        } else if(actChip.name === 'Red') {
            this.createYellowChip();
        }
    }

    this.createRedChip = function()
    {
        var yellowChip  = new THREE.ColladaLoader();
        yellowChip.options.convertUpAxis = true;
        yellowChip.load('models/ChipRed.dae', function (collada) {
            console.log('RedChipLoaded');
            self.setNewChipPosition(collada, "Red");
        });
    }
  
    this.createYellowChip = function()
    {
        var yellowChip  = new THREE.ColladaLoader();
        yellowChip.options.convertUpAxis = true;
        self = this;
        yellowChip.load('models/ChipGelb.dae', function (collada) {
            console.log('YellowChipLoaded');
            self.setNewChipPosition(collada, "Yellow");
        });
    }
    
    this.setNewChipPosition = function(collada, color) {
        actChip = collada.scene;
        actChip.name = color;
        actChip.position.x = actChip.position.x + 2.2;
        actChip.position.y = actChip.position.y - 1.55;
        //Hide Collider-Walls
        //game.children[0].children[0].visible = false;
        world.add(actChip);

        game.start();
        
        if (game.getLevel() == 1)
            game.setSeconds(60);
        else if (game.getLevel() == 2)
            game.setSeconds(30); 
        else if (game.getLevel() == 3)
            game.setSeconds(10);
            
        game.setCounter(setInterval(function() {
            game.timer();
        }, 1000)); 
    }
    
    this.moveLeft = function() {
        if (chipMoving == false && actChip.position.x < 2.2) {
            actChip.position.x = actChip.position.x + 0.75; 
        }
    }
    
    this.moveRight = function() {
        if (chipMoving == false && actChip.position.x > -2.3) {
            actChip.position.x = actChip.position.x - 0.75; 
        }
    }
    
    this.moveDown = function(index) {
        game.clearCounter();
        if (chipMoving == false) {
            for (var i = chips[index].length - 1; i >= 0; i--) {
                if (chips[index][i] == 0) {
                    var yPosition = game.getYPostion(i);
                    this.move(yPosition)

                    if (actChip.name.valueOf() == 'Yellow')
                        chips[index][i] = 1;
                    else
                        chips[index][i] = 2;
                    break;
                }
            }
        }
    }
    
    this.move = function(yPosition) {
        clearTimeout(timeout);
        if (actChip.position.y < yPosition) {
            chipMoving = true;
            actChip.position.y = actChip.position.y + 0.05;
            renderer.render(world, camera);
            self = this;
            timeout = window.setTimeout(function() {
                self.move(yPosition);
            }, 20);
        } else {
           chipMoving = false;
           var final = this.checkFinal(); 
           if (final == true) {
                alert("Gewonnen");
           } else {
                this.createNewChip();
           }
        }
    }
    
    this.getChipPosition = function() {
        return actChip.position;
    }
    
    this.checkFinal = function() {
        var player = this.getActivePlayerNumber();
        
        // Horizontal
        for (var i = 0; i < chips.length - 3; i++) {
            for (var j = 0; j < chips[i].length ; j++) {
                if (
                    chips[i][j] == player
                    &&
                    chips[i + 1][j] == player
                    &&
                    chips[i + 2][j] == player
                    &&
                    chips[i + 3][j] == player
                )
                {
                    return true;
                }
            }
        }
        
        // Vertikal
        for (var i = 0; i < chips.length; i++) {
            for (var j = 0; j < chips[i].length - 3; j++) {
                if (
                    chips[i][j] == player
                    &&
                    chips[i][j + 1] == player
                    &&
                    chips[i][j + 2] == player
                    &&
                    chips[i][j + 3] == player
                )
                {
                    return true;
                }
            }
        }
        
        // Diagonal oben links, unten rechts
        for (var i = 0; i <= chips.length - 4; i++) {
            for (var j = 0; j <= chips[i].length - 4; j++) {
                if (
                    chips[i][j] == player
                    &&
                    chips[i + 1][j + 1] == player
                    &&
                    chips[i + 2][j + 2] == player
                    &&
                    chips[i + 3][j + 3] == player
                )
                {
                    return true;
                }
            }
        }
        
        // Diagonal unten links, oben rechts
        for (var i = chips.length - 4; i >= 0 ; i--) {
            for (var j = 2; j < chips[i].length; j++) {
                if (
                    chips[i][j] == player
                    &&
                    chips[i + 1][j - 1] == player
                    &&
                    chips[i + 2][j - 2] == player
                    &&
                    chips[i + 3][j - 3] == player
                )
                {
                    return true;
                }
            }
        }
    }
    
    this.getActivePlayerNumber = function() {
        if (actChip.name.valueOf() === "Yellow") {
            return 1;
        } else {
            return 2;
        }
    }
}

