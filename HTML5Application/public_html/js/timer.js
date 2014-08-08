/**
* Record and display the Time from the first vehicle
* Movement until the red car reaches the garage
*/

function Timer() {
    var then, now, pause, interval;
    var min = 0;
    var hour = 0;
    var sec = 0;
    this.started = false;
    this.startnow = function(){
        if(!this.started){
            this.started = true;
            then = new Date();
            console.log('Timer starts');
            interval = setInterval(function(){timer.go()}, 1000);
        }
    }
    this.go = function(){
        now=new Date();
        sec=now.getSeconds()-then.getSeconds();
        if(sec<0)
            sec+=60;
        if (sec==0)
            min++;
        if(min>59){
            min-=60;
            hour++;
        }
        document.getElementById("s").firstChild.nodeValue=sec;
        if(document.getElementById("s").firstChild.nodeValue.length<2){
            document.getElementById("s").firstChild.nodeValue="0"+document.getElementById("s").firstChild.nodeValue;
        }
        document.getElementById("m").firstChild.nodeValue=min;
        if(document.getElementById("m").firstChild.nodeValue.length<2){
            document.getElementById("m").firstChild.nodeValue="0"+document.getElementById("m").firstChild.nodeValue;
        }
        document.getElementById("h").firstChild.nodeValue=hour;
    }
    this.stop = function(){
        this.started = false;
        clearInterval(interval);
    }
    this.clear = function(){
        this.started = false;
        clearInterval(interval);
        document.getElementById("s").firstChild.nodeValue="00";
        document.getElementById("m").firstChild.nodeValue="00";
        document.getElementById("h").firstChild.nodeValue="0";
        min=0;
        hour=0;
        sec = 0;
    }
}