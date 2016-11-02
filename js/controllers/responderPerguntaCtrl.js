angular.module("cadastrarPergunta").controller("responderPerguntaCtrl", function ($scope, $routeParams, $http, perguntasAPI){
                $scope.app = "Cadastrar Pergunta";
                $scope.perguntas = [];
                $scope.respostas = [];
                var carregarRespostas = function (){
                    perguntasAPI.getRespostas().success(function(data, status){
                        $scope.respostas = data;
                    }).error(function (data, status){
                        $scope.message = "Aconteceu um problema: " + data;
                    });
                };
                $scope.adicionarResposta = function(resposta) {
                    perguntasAPI.saveResposta($routeParams.id, resposta).success(function(data){
                        delete $scope.resposta;
                        $scope.perguntaForm.$setPristine();
                        carregarRespostas();
                    });
                };
                carregarRespostas();
            });