angular.module("cadastrarPergunta").controller("editarUsuarioCtrl", function ($scope, $routeParams, $http, perguntasAPI){
    $scope.app = "Cadastrar Pergunta";
    $scope.usuarios = [];
    $scope.estados = [];
    var carregarUsuarios = function (){
        perguntasAPI.getUsuario($routeParams.id).success(function(data, status){
            $scope.usuarios = data;
            console.log($scope.usuarios);
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
     $scope.editaUsuario = function(id, usuario){
        perguntasAPI.editaUsuario(id, usuario).success(function(data){
            delete $scope.usuario;
        });
     };
     carregarUsuarios();
 });