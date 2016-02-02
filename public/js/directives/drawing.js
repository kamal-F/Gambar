angular.module('app').
	directive('drawing', drawing)
;

var warnas = ["#800000","#1803ff","#32ff03","#fdf203","#fd03c0"];
//var warna = warnas[Math.floor(Math.random()*warnas.length)];
var warna = "#800000";

function drawing(){
  return {
    restrict: "A",
    link: function(scope, element){
      var ctx = element[0].getContext('2d');
      
      // variable that decides if something should be drawn on mousemove
      var drawing = false;
      
      // the last coordinates before the current move
      var lastX;
      var lastY;
      
      element.bind('mousedown', function(event){
        if(event.offsetX!==undefined){
          lastX = event.offsetX;
          lastY = event.offsetY;
        } else {
          lastX = event.layerX - event.currentTarget.offsetLeft;
          lastY = event.layerY - event.currentTarget.offsetTop;
        }
        
        // begins new line
        ctx.beginPath();
        
        drawing = true;
      });
      
      element.bind('mouseup', function(event){
          // stop drawing
          drawing = false;
        });
      
      element.bind('mouseleave', function(event){
          // stop drawing
          drawing = false;
        });
      
      element.bind('mousemove', function(event){
    	  if(event.offsetX!==undefined){
              currentX = event.offsetX;
              currentY = event.offsetY;
            } else {
              currentX = event.layerX - event.currentTarget.offsetLeft;
              currentY = event.layerY - event.currentTarget.offsetTop;
            }
    	  
    	  socket.emit('mousemove',{
  			'x': currentX,
  			'y': currentY,
  			'drawing': drawing,
  			'id': id,
  			'warna' : warna
  		});
    	  
        if(drawing){
          // get current mouse position          
          
          draw(lastX, lastY, currentX, currentY, warna);
          
          // set current coordinates to last one
          lastX = currentX;
          lastY = currentY;
        }
        
      });
      
        
      // canvas reset
      function reset(){
       element[0].width = element[0].width; 
      }
      
      function draw(lX, lY, cX, cY, warnanya){
        // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color
        ctx.strokeStyle = warnanya;
        // draw it
        ctx.stroke();
      }
    }
  };
};