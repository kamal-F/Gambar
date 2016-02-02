//login users
angular.module('app').
	controller('users', users)
;

function users($scope, $rootScope, $http, $cookies, PaginationService) {
	
	var isLoged = $cookies.get('isLoged');
	
	
	if(isLoged=='true'){
		$rootScope.loged = true;
	} else {
		$rootScope.loged = false;
	}
		
	// List of users got from the server
	  $scope.users = [];	  
	  $scope.user = null;
	  $scope.buttonupdate = false;
	  $scope.editUserTitle = "User Baru";
	  
	  $scope.currentPage = 0;
	  
	  // Fill the array to display it in the page
	  function refresh(){
		  /*
		  $scope.users = [];
		  $http.get('/users/list').success(function(users){		  
			  for (var i in users)
				  $scope.users.push(users[i]);
		  });
		  */
		  pagecount();
		  paging($scope.currentPage);
		  
		  $scope.user = null;
	  }
	  
	  //----
	  //hapus
	  function hapus(user){
		  // Pop up a confirmation dialog
		  var confirmation = confirm('Anda akan menghapus user?');

		  // Check and make sure the user confirmed
		  if (confirmation === true) {
			  console.log("halooooo " + user.id);
			  
			  var responsePromise = $http.delete("/users/delete/" + user.id);
			
			  responsePromise.success(function(data, status, headers, config) {
				  refresh();
			  });
			  responsePromise.error(function(data, status, headers, config) {
				  alert("AJAX failed!");
			  });
		  }else {
			  // If they said no to the confirm, do nothing
			  return false;
		  }
	  }

	  $scope.hapus = hapus;
	  
	  //-----
	  //tambah
	  function tambah(){
		  //console.log($scope.user.nama);
		  var responsePromise = $http.post("/users/add", $scope.user);

		  responsePromise.success(function(data, status, headers, config) {        	
			  $scope.person=null;
			  refresh();        	
		  });
		  responsePromise.error(function(data, status, headers, config) {
			  alert("AJAX failed!");
		  });
	  }

	  $scope.tambah = tambah;
	  
	  //isi form
	  function isiForm(user){
		  //async, menunggu [send] balik dari server
		  
		  var responsePromise = $http.get("/users/listone/" + user.id);

		  responsePromise.success(function(data, status, headers, config) {
			  //console.log(data);
			  $scope.user = data[0];			  
			  //toggle, show update button, hide save button
			  $scope.buttonupdate=true;
			  $scope.editUserTitle = "User Lama";			  
		  });
		  responsePromise.error(function(data, status, headers, config) {
			  alert("AJAX failed!");
		  });
	  }

	  $scope.isiForm = isiForm;

	  //-----
	  //ubah
	  function ubah(){
		  console.log($scope.user);
		  var responsePromise = $http.put("/users/update", $scope.user);

		  responsePromise.success(function(data, status, headers, config) {        	
			  $scope.person=null;
			  
			  //kembali ke opsi buat user baru yaitu batal update
			  batal();
			  refresh();        	
		  });
		  responsePromise.error(function(data, status, headers, config) {
			  alert("AJAX failed!");
		  });
	  }

	  $scope.ubah = ubah;
	  
	  function batal(){
		  $scope.buttonupdate= !true;
		  $scope.editUserTitle = "User Baru";
		  $scope.user = null; 
	  }
	  
	  $scope.batal = batal;
	  
	  
	  //paging	  
	  function paging(pageNo){		  
		  
		  $scope.users = PaginationService.query({
	            pageNo: pageNo
	        });
	        
			  $scope.user = null;
	  }
	  
	  $scope.paging = paging;
	  
	  //pagecount
	  function pagecount(){
		  $http.get('/users/pagecount').success(function(jumlah){			 
			  $scope.jumlah = jumlah[0].totalpage;
			  //hardcode
			  $scope.jumlah = parseInt( $scope.jumlah / 3 );
		  });
	  }
	  //$scope.pagecount = pagecount;
	  
	 function pagingbefore(){
		 if($scope.currentPage > 0){
			 $scope.currentPage--;
			 paging($scope.currentPage);
		 }
	 }
	 $scope.pagingbefore = pagingbefore;
	 
	 function pagingnext(){
		 if($scope.currentPage < $scope.jumlah){
			 $scope.currentPage++;
			 paging($scope.currentPage);
		 }
	 }
	 $scope.pagingnext = pagingnext;
	 
	  
	  //runn di awal control
	  refresh();
};