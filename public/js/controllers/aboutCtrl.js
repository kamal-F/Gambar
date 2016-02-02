angular.module('app').
	controller('about', about)
;

function about($scope, $rootScope, $cookies) {
	
	var isLoged = $cookies.get('isLoged');
	 
	//var bool_value = isLoged == "true"	
	//console.log('DAPAt', bool_value);
	
	if(isLoged=='true'){
		$rootScope.loged = true;
	} else {
		$rootScope.loged = false;
	}
	
	$scope.isi = 'TESTssssssss';
}