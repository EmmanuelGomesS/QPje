angular.module("cadastrarPergunta").config(function($routeProvider) {
    $routeProvider.when("/novaPergunta", {
        templateUrl: "view/novaPergunta.html",
        controller: "novaPerguntaCtrl"
    });
    $routeProvider.when("/novoUsuario", {
        templateUrl: "view/novoUsuario.html",
        controller: "cadastrarUsuarioCtrl"
    });
    $routeProvider.when("/logarse", {
        templateUrl: "view/logarse.html",
        controller: "logarseCtrl"
    });
    $routeProvider.when("/perguntas/page/:id", {
        templateUrl: "view/perguntas.html",
        controller: "cadastrarPerguntaCtrl"
    });
    $routeProvider.when("/usuario", {
        templateUrl: "view/usuario.html",
        controller: "exibirUsuarioCtrl"
    });
    $routeProvider.when("/painel/:oab", {
        templateUrl: "view/painel.html",
        controller: "painelUsuarioCtrl"
    });
    $routeProvider.when("/editarUsuario/:id", {
        templateUrl: "view/editarUsuario.html",
        controller: "editarUsuarioCtrl"
    });
    $routeProvider.when("/detalhesPergunta/:id", {
        templateUrl: "view/detalhesPergunta.html",
        controller: "detalhesPerguntaCtrl"
    });
    $routeProvider.when("/respostas/:id", {
        templateUrl: "view/respostas.html",
        controller: "responderPerguntaCtrl"
    });
});