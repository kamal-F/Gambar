angular.module('app').
	controller('rank', rank)
;

function rank($scope, $rootScope, $http, $cookies) {
	
	var isLoged = $cookies.get('isLoged');
	
	if(isLoged=='true'){
		$rootScope.loged = true;
	} else {
		$rootScope.loged = false;
	}
	
	function refresh(){
		  $scope.ranks = [];
		  $http.get('/rank').success(function(ranks){
			  for (var i in ranks)
				  $scope.ranks.push(ranks[i]);
		  });
		  
		  $scope.rank = null;
	  }
	
	$scope.refresh = refresh;
	
	refresh();
}