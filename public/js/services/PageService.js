angular.module('app').
	service('PaginationService', [ '$resource' , PaginationService])
;

function PaginationService($resource) {
	return $resource('users/page/:pageNo', {
        pageNo: '@pageNo'
    });
}
