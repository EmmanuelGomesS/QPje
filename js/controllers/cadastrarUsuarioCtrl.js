angular.module("cadastrarPergunta").controller("cadastrarUsuarioCtrl", function ($scope, $routeParams, $http, perguntasAPI){
    $scope.app = "Cadastrar Pergunta";
    $scope.usuarios = [];
    $scope.estados = [];
    var carregarUsuarios = function (){
        perguntasAPI.getUsuarios($routeParams.id).success(function(data, status){
            $scope.usuarios = data;
        }).error(function (data, status){
            $scope.message = "Aconteceu um problema: " + data;
        });
     };
     $scope.adicionarUsuario = function(usuario) {
        perguntasAPI.saveUsuarios(usuario).success(function(data){
            delete $scope.usuario;
            $scope.perguntaForm.$setPristine();
            carregarUsuarios();
        });
     };
    carregarUsuarios();
 });
