angular.module("cadastrarPergunta").controller("cadastrarPerguntaCtrl", function ($scope, $routeParams, $http, perguntasAPI){
                $scope.app = "Cadastrar Pergunta";
                $scope.perguntas = [];
                $scope.respostas = [];
                $scope.medias = [];

                var listAllPerguntas = function (){
                    perguntasAPI.listAllPerguntas($routeParams).success(function(data, status){
                        $scope.perguntas = data;
                       var qtePerguntas = data.length;
                       var qtePage = qtePerguntas / 3;
                        var html = "";
                       for (var i = 0; i <= qtePage; i++) {
                            html = html + "<a onClick='redirect("+i+")''><button  class='btn3 btn-primary'>" + (i+1 ) + "</button></a>";
                       }
                       var btnpage = document.getElementById("btnpage");
                       document.getElementById("btnpage").innerHTML = html;
                    }).error(function (data, status){
                        $scope.message = "Aconteceu um problema: " + data;
                    });
                };
                var carregarPerguntas = function (){
                    perguntasAPI.getPerguntas($routeParams.id).success(function(data, status){
                        $scope.perguntas = data;
                        console.log(data);
                    }).error(function (data, status){
                        $scope.message = "Aconteceu um problema: " + data;
                    });
                };
                $scope.adicionarPergunta = function(pergunta) {
                    perguntasAPI.savePergunta(pergunta).success(function(data){
                        delete $scope.pergunta;
                        $scope.perguntaForm.$setPristine();
                        carregarPerguntas();
                    });
                };

                listAllPerguntas();

               /* var carregarRespostas = function (){
                    perguntasAPI.getRespostas().success(function(data, status){
                        $scope.respostas = data;
                    }).error(function (data, status){
                        $scope.message = "Aconteceu um problema: " + data;
                    });
                };
                $scope.adicionarResposta = function(resposta) {
                    perguntasAPI.saveResposta(resposta).success(function(data){
                        delete $scope.resposta;
                        $scope.perguntaForm.$setPristine();
                        carregarRespostas();
                    });
                };*/
                carregarPerguntas();
                /*carregarRespostas();*/
            });

  function redirect(id){
    var url = "listarperguntas.html#/perguntas/page/"+id;
    window.location.href= url;
}