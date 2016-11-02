angular.module("cadastrarPergunta").controller("exibirUsuarioCtrl", function ($scope, $routeParams, $http, perguntasAPI){
    $scope.app = "Cadastrar Pergunta";
    $scope.usuarios = [];
    $scope.estados = [];
    var carregarUsuarios = function (){
        perguntasAPI.getUsuarios().success(function(data, status){
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
     $scope.apagarUsuario = function(id){
        perguntasAPI.apagarUsuario(id).success(function(data){
            delete $scope.usuario;
            carregarUsuarios();
        });
     };
     $scope.editarUsuario = function(usuario){
        $scope = jQuery(usuario).closest('tr');
        $scope.find('input').removeAttr('disabled');
     };
     carregarUsuarios();
 });