$(document).ready(function () {
    "use strict";
    
    var frame = 0;
    var lastUpdateTime = 0;
    var acDelta = 0;
    var msPerFrame = 100;
    
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
            this.canvas.width = 1000;
            this.canvas.height = 530;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        }
    };    
    
    function createimage(){
      var img = new Image();
      img.src = 'image/attract.png';
      img.onload = function(){
             x = gameArea.canvas.width + 94;
             y = gameArea.canvas.height + 94;          
             gameArea.imageref = img;
             gameArea.coinradius = 84;
             redraw();
             setTimeout( update, 1000 / 60 );
      }
    }

    function redraw() {
        gameArea.context.clearRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
        gameArea.context.fillStyle = '#000000';
        gameArea.context.fillRect(0, 0, gameArea.canvas.width, gameArea.canvas.height);
        gameArea.context.save();
//        gameArea.context.scale(0.5,0.5);
        gameArea.context.drawImage(gameArea.imageref, frame*100, 0, 92, 94, x, y, 92, 94);
        gameArea.context.restore();
    }    
    
    function update() {
        requestAnimFrame(update);
    
        var delta = Date.now() - lastUpdateTime;
        if (acDelta > msPerFrame)
        {
            acDelta = 0;
            calculateposition();
            redraw();
            frame++;
            if (frame >= 8) frame = 0;
        } 
        else
        {
            acDelta += delta;
        }
    
        lastUpdateTime = Date.now();
    }
        
    gameArea.start();
    
    var x = 0;
    var y = 0;
    var dx = 0;
    var dy = 0;
    var step = -20;
    var collision = false;
    
    function calculateposition() {  
        
        if (!collision){        
            if(x + dx > gameArea.canvas.width - gameArea.coinradius ) {
                dx = -10;
            }

            if (x + dx < step) {
                dx = 94;
                collision = true;
            }

            if(y + dy > gameArea.canvas.height - gameArea.coinradius) {
                    dy = -10;
            }        

            if (y + dy < step ) {
                dy = 94;
                collision = true;
            }

            x += dx;
            y += dy;
        }
    }    
    
    createimage();
    
    var credits = 0;
    
    $('#credits').on('click', function(event) {
//      alert("Insert Credit");
        credits += 100;
        $(this).html("Credits: $" + credits + ".00");
    });    
    
    $('#collect').on('click', function(event) {
        if (credits > 0) {
            credits = 0;
//            $("pull-left.credits").html("Credits: $" + credits + ".00");             
        }
        else{
            alert("No Credits");
        }
    });        
});