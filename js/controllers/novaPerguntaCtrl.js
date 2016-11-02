angular.module("cadastrarPergunta").controller("novaPerguntaCtrl", function ($scope, $http, perguntasAPI, $rootScope){
    $scope.app = "Cadastrar Pergunta";
    $scope.tokens = $rootScope.tokens;


    $scope.adicionarPergunta = function(pergunta, tokens) {
        perguntasAPI.savePergunta(pergunta).success(function(data){
            delete $scope.pergunta;
            $scope.perguntaForm.$setPristine();

        });
    };
});