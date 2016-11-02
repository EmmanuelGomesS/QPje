angular.module("cadastrarPergunta").controller("detalhesPerguntaCtrl", function ($scope, $routeParams, $http, perguntasAPI, $rootScope){

    $scope.app = "Cadastrar Pergunta";
    $scope.respostas = [];
    $scope.rating = 5;
    $scope.medias = [];
    $scope.value = 0;
    $rootScope.rate = '';


    $scope.rateFunction = function(rating, id) {
      alert('Rating selected - ' + rating);
    };



    $scope.carregarRating = function(id){

        return (perguntasAPI.getRating(id).success(function(data){
            var m1 = 0;
            $scope.medias = data;
            var qtdeMedias = $scope.medias.length;
            m1 = $scope.medias[0].rating;
            return m1+0;
        }));

    };


    $scope.carregarRating2 = function(id){
        var x = 3;
        return x;
    };


    $scope.adicionarRating = function(id, rating){
        perguntasAPI.saveRating(id, rating).success(function(){
            delete $scope.rating;
        });
    };


    var carregarRespostas = function (){
        perguntasAPI.getResposta($routeParams.id).success(function(data, status){
        $scope.respostas = data;
        console.log($scope.respostas);
      })
    };
/*
    perguntasAPI.getPergunta($routeParams.id).success(function(pergunta){
        $scope.pergunta = pergunta;
    });
    getPergunta();
*/

    carregarRespostas();
    }).directive('starRating',
    function() {
        return {
            restrict : 'A',
            template : '<ul class="rating">'
                     + '    <li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
                     + '\u2605'
                     + '</li>'
                     + '</ul>',
            scope : {
                ratingValue : '=',
                max : '=',
                onRatingSelected : '&'
            },
            link : function(scope, elem, attrs) {
                var updateStars = function() {
                    scope.stars = [];
                    for ( var i = 0; i < scope.max; i++) {
                        scope.stars.push({
                            filled : i < scope.ratingValue
                        });
                    }
                };

               scope.toggle = function(index) {
                    scope.ratingValue = index + 1;
                    scope.onRatingSelected({
                        rating : index + 1
                    });
                };

                scope.$watch('ratingValue',
                    function(oldVal, newVal) {
                        if (newVal) {
                            console.log(newVal);
                            updateStars();
                        }

                    }
                );
            }
        };
    }

);