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
    this.highlightCounter = 0;
    
    this.createNewChip = function()
    {
        if (actChip.name.valueOf() === 'Yellow') {
            this.createRedChip();
        } else if (actChip.name === 'Red') {
            this.createYellowChip();
        }
    }

    this.createRedChip = function()
    {
        var yellowChip = new THREE.ColladaLoader();
        yellowChip.options.convertUpAxis = true;

        self = this;
        yellowChip.load('models/ChipRed.dae', function (collada) {
            self.setNewChipPosition(collada, "Red");
        });
    }

    this.createYellowChip = function()
    {
        var yellowChip = new THREE.ColladaLoader();
        yellowChip.options.convertUpAxis = true;
        self = this;
        yellowChip.load('models/ChipGelb.dae', function(collada) {
            self.setNewChipPosition(collada, "Yellow");
        });
    }

    this.setNewChipPosition = function(collada, color) {
        actChip = collada.scene;
        actChip.name = color;

        document.getElementById("player").innerHTML = "Spieler " + this.getActivePlayerNumber() + " ist am Zug";

        actChip.position.x = actChip.position.x + 2.2;
        actChip.position.y = actChip.position.y - 1.55;
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
        if (chipMoving == false && actChip != null && actChip.position.x < 2.2) {
            actChip.position.x = actChip.position.x + 0.75;
        }
    }

    this.moveRight = function() {
        if (chipMoving == false && actChip != null && actChip.position.x > -2.3) {
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

                    chips[index][i] = actChip;
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
                actChip = null;
                new Audio("sounds/applause.mp3").play();
                document.getElementById("game").className = "hide";
                document.getElementById("gameEnd").className = "";
                document.getElementById("winner").innerHTML = "Spieler " + chipMng.getActivePlayerNumber() + " hat gewonnen";
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
            for (var j = 0; j < chips[i].length; j++) {
                if (
                    chips[i][j] != 0
                    &&
                    chips[i][j].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i + 1][j] != 0
                    &&
                    chips[i + 1][j].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i + 2][j] != 0
                    &&
                    chips[i + 2][j].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i + 3][j] != 0
                    &&
                    chips[i + 3][j].name.valueOf() == actChip.name.valueOf()
                )
                {
                    this.hightlightChips(chips[i][j], chips[i + 1][j], chips[i + 2][j], chips[i + 3][j]);
                    return true;
                }
            }
        }

        // Vertikal
        for (var i = 0; i < chips.length; i++) {
            for (var j = 0; j < chips[i].length - 3; j++) {
                if (
                    chips[i][j] != 0
                    &&
                    chips[i][j].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i][j + 1] != 0
                    &&
                    chips[i][j + 1].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i][j + 2] != 0
                    &&
                    chips[i][j + 2].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i][j + 3] != 0
                    &&
                    chips[i][j + 3].name.valueOf() == actChip.name.valueOf()
                )
                {
                    this.hightlightChips(chips[i][j], chips[i][j + 1], chips[i][j + 2], chips[i][j + 3]);
                    return true;
                }
            }
        }

        // Diagonal oben links, unten rechts
        for (var i = 0; i <= chips.length - 4; i++) {
            for (var j = 0; j <= chips[i].length - 4; j++) {
                if (
                    chips[i][j] != 0
                    &&
                    chips[i][j].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i + 1][j + 1] != 0
                    &&
                    chips[i + 1][j + 1].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i + 2][j + 2] != 0
                    &&
                    chips[i + 2][j + 2].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i + 3][j + 3] != 0
                    &&
                    chips[i + 3][j + 3].name.valueOf() == actChip.name.valueOf()
                )
                {
                    this.hightlightChips(chips[i][j], chips[i + 1][j + 1], chips[i + 2][j + 2], chips[i + 3][j + 3]);
                    return true;
                }
            }
        }

        // Diagonal unten links, oben rechts
        for (var i = chips.length - 4; i >= 0; i--) {
            for (var j = 2; j < chips[i].length; j++) {
                if (
                    chips[i][j] != 0
                    &&
                    chips[i][j].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i + 1][j - 1] != 0
                    &&
                    chips[i + 1][j - 1].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i + 2][j - 2] != 0
                    &&
                    chips[i + 2][j - 2].name.valueOf() == actChip.name.valueOf()
                    &&
                    chips[i + 3][j - 3] != 0
                    &&
                    chips[i + 3][j - 3].name.valueOf() == actChip.name.valueOf()
                )
                {
                    this.hightlightChips(chips[i][j], chips[i + 1][j - 1], chips[i + 2][j - 2], chips[i + 3][j - 3]);
                    return true;
                }
            }
        }
    }
    
    this.hightlightChips = function(chip1, chip2, chip3, chip4) {
        var timeoutHightlight = clearTimeout();
        var self = this;
        
        if (chip1.position.y != 100) {
            chip1.position.y_old = chip1.position.y;
            chip1.position.y = 100;
            chip2.position.y_old = chip2.position.y;
            chip2.position.y = 100;
            chip3.position.y_old = chip3.position.y;
            chip3.position.y = 100;
            chip4.position.y_old = chip4.position.y;
            chip4.position.y = 100;
            renderer.render(world, camera);
            console.log("Aus:" + this.highlightCounter);
            if (this.highlightCounter <= 2) {
                timeoutHightlight = window.setTimeout(function() {
                    self.hightlightChips(chip1, chip2, chip3, chip4);
                }, 1000);
            }
        } else {
            chip1.position.y = chip1.position.y_old;
            chip2.position.y = chip2.position.y_old;
            chip3.position.y = chip3.position.y_old;
            chip4.position.y = chip4.position.y_old;
            renderer.render(world, camera);
            console.log("An:" + this.highlightCounter);
            if (this.highlightCounter < 3) {
                timeoutHightlight = window.setTimeout(function() {
                    self.hightlightChips(chip1, chip2, chip3, chip4);
                }, 1000);
            }
        }
        this.highlightCounter += 1;    
    }

    this.getActivePlayerNumber = function() {
        if (actChip.name.valueOf() === "Yellow") {
            return 1;
        } else {
            return 2;
        }
    }

    this.setup = function() {
        chipMoving = false;
        actChip = null;
        highlightCounter = 0;
        for (var i = 0; i < chips.length; i++) {
            chips[i] = new Array(6);

            for (var j = 0; j < chips[i].length; j++) {
                chips[i][j] = 0;
            }
        }
    }
    
    this.setActChip = function(value) {
        actChip = value;
    }
}

