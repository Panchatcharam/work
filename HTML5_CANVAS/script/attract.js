$(document).ready(function () {
    "use strict";
     
    var credits = {
        value : 0
    }
        
    var animInfo = {
        frame : 0,
        lastUpdateTime : 0,
        acDelta : 0,
        msPerFrame : 100
    }
    
    var playAttract = {
        status : true
    }
    
    var pos = {
        x : 0,
        y : 0,
        dx : 0,
        dy : 0,
        step : -20,
        collision : false
    }
    
    window.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function( callback ){
                  window.setTimeout(callback, 1000 / 60);
                };
    })();
  
    var gameArea = {
        canvas : document.getElementById("myCanvas"),
        start : function() {
//            this.canvas.width = 1000;
//            this.canvas.height = 800;//530;
            this.canvas.width = window.innerWidth - 200;
            this.canvas.height = window.innerHeight - 200;//530;            
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        }
    };    
    
    function startattract(){
      var img = new Image();
      img.src = 'image/attract.png';
      img.onload = function(){
             pos.x = gameArea.canvas.width + 94;
             pos.y = gameArea.canvas.height + 94;
             gameArea.imageref = img;
             gameArea.coinradius = 84;
             redraw();
             update();
      }
    }

    function redraw() {
        gameArea.context.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
//        gameArea.context.fillStyle = '#ccffcc';//'#000000';
//        gameArea.context.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
        if (playAttract.status) {        
            gameArea.context.save();
            gameArea.context.drawImage(gameArea.imageref, animInfo.frame*100, 0, 92, 94, pos.x, pos.y, 92, 94);
            gameArea.context.restore();
        }
    }    
    
    function update() {
        if (playAttract.status) {
            requestAnimFrame(update);

            var delta = Date.now() - animInfo.lastUpdateTime;
            if (animInfo.acDelta > animInfo.msPerFrame)
            {
                animInfo.acDelta = 0;
                calculateposition();
                redraw();
                animInfo.frame++;
                if (animInfo.frame >= 8) animInfo.frame = 0;
            } 
            else
            {
                animInfo.acDelta += delta;
            }

            animInfo.lastUpdateTime = Date.now();
        }
    }
        
    function calculateposition() {  
        
        if (!pos.collision){        
            if(pos.x + pos.dx > gameArea.canvas.width - gameArea.coinradius ) {
                pos.dx = -10;
            }

            if (pos.x + pos.dx < pos.step) {
                pos.dx = 42;
                pos.collision = true;
            }

            if(pos.y + pos.dy > gameArea.canvas.height - gameArea.coinradius) {
                    pos.dy = -10;
            }        

            if (pos.y + pos.dy < pos.step ) {
                pos.dy = 42;
                pos.collision = true;
            }

            pos.x += pos.dx;
            pos.y += pos.dy;
        }
    }    
    
    // Insert credits
    $('#credits').on('click', function(event) {
        if (credits.value <= 0) {
            playAttract.status = false;
            credits.value += 100;
            $(this).html("Credits: $" + credits.value + ".00");
              // clear
            redraw();
        }
    });
    
    // Collect credits
    $('#collect').on('click', function(event) {
        if (credits.value > 0) {
                playAttract.status = true;
                pos.x = gameArea.canvas.width + 94;
                pos.y = gameArea.canvas.height + 94;
                pos.collision = false;
                animInfo.frame = 0;
                animInfo.lastUpdateTime = 0;
                animInfo.acDelta = 0;
                redraw();
                update();
                credits.value = 0;
                $("#credits").html("Credits: $" + credits.value + ".00");             
        }
        else{
            alert("No Credits to collect");
        }
    });
    
    // Create game area
    gameArea.start();
    
    // start attract animation
    startattract();
});