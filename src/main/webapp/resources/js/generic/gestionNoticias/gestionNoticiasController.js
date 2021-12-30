var app = angular.module('gestionNoticiasApp', []);
app.controller('gestionNoticiasController', ['$scope', '$q', '$filter', function ($scope, $q, $filter) {
	$("#moduloGestionNoticias").addClass('active');
	$("#nav-bar-otros-options ul li.active").closest("#nav-bar-otros-options").addClass('active-otros-navbar');
	
}]);