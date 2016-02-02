//partial index-gambarmain
angular.module('app').
	controller('gambarmain', gambarmain)
;



function gambarmain($scope, $rootScope , $cookies) {	
	var clients = {};
	
	var isLoged = $cookies.get('isLoged');
		
	if(isLoged=='true'){
		$rootScope.loged = true;
	} else {
		$rootScope.loged = false;
	}
		
	
	//$rootScope.message ="inidsdsd "+ isLoged;
	
	
	//$scope.warna = warna;
	$scope.warna = 'dsdsdsds';
	
	function makeid(){
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	};	
	
	id= makeid();
	
	function draw(lX, lY, cX, cY, warnanya){
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');
        // line from
        ctx.moveTo(lX,lY);
        // to
        ctx.lineTo(cX,cY);
        // color
        ctx.strokeStyle = warnanya;
        // draw it
        ctx.stroke();
      }
	
	socket.on('moving', function (data) {
		console.log("ini "+ data.id);
		
		// Is the user drawing?		
		if(data.drawing && clients[data.id]){
			
			// Draw a line on the canvas. clients[data.id] holds
			// the previous position of this user's mouse pointer
			
			$scope.ket = 
			"warna=" + data.warna + ' ' +			
			"posx= " + clients[data.id].x + ' ' +			
			"posx baru= " + data.x 
			;
			$scope.$apply();
			
			draw(clients[data.id].x, clients[data.id].y, data.x, data.y, data.warna);
			
		}
		
		// Saving the current client state
		clients[data.id] = data;
				
	});	
	
}