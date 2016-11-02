angular.module("cadastrarPergunta").controller("logarseCtrl", function ($scope, $http, $routeParams, perguntasAPI, $rootScope){
    $scope.app = "Realizar Login";
    $rootScope.tokens = '';

    var executarLogin = function (){
            perguntasAPI.getLogin($routeParams.id).success(function(data, status){
            $scope.logins = data;
            console.log(data);
            }).error(function (data, status){
            $scope.message = "Aconteceu um problema: " + data;
        });
    };
    $scope.adicionarLogin = function(login, tokens) {
        perguntasAPI.saveLogin(login).success(function(data){
        $rootScope.tokens = data;
        $scope.perguntaForm.$setPristine();
        console.log($rootScope.tokens);

        });

        console.log($rootScope.tokens);


    };



});