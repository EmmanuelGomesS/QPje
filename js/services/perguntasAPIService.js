angular.module("cadastrarPergunta").factory("perguntasAPI", function($http, config){

    var _getPerguntas = function (id) {
        console.log(id);
        return $http.get(config.baseUrl + "/perguntas/page/" + id);
    }

     var _listAllPerguntas = function () {

        return $http.get(config.baseUrl + "/perguntas" );
    }

    var _pushPerguntas = function (id) {
        console.log(id);
        return $http.push(config.baseUrl + "/perguntas/page/" + id);
    }

    var _savePergunta = function (pergunta, tokens) {
        return $http.post(config.baseUrl + "/perguntas", pergunta, tokens);
    }

    var _getRespostas = function () {
        return $http.get(config.baseUrl + "/respostas");
    }

    var _getResposta = function (id) {
        return $http.get(config.baseUrl + "/respostas/" + id);
    }

    var _saveResposta = function (id, resposta) {
        return $http.post(config.baseUrl + "/respostas/" + id, resposta);
    }

    var _getLogin = function (id) {
        console.log(id);
        return $http.get(config.baseUrl + "/logins/" + id);
    }

    var _saveLogin = function (login) {
        return $http.post(config.baseUrl + "/logins/", login);
    }

    var _getUsuarios = function () {
        return $http.get(config.baseUrl + "/usuario");
    }

    var _getUsuario = function (id) {
        return $http.get(config.baseUrl + "/usuario/" + id);
    }

    var _saveUsuarios = function (usuario) {
        return $http.post(config.baseUrl + "/usuario", usuario);
    }

    var _getPainel = function (oab) {
        return $http.get(config.baseUrl + "/painel/" + oab);
    }

    var _apagarUsuario = function (id) {
        return $http.delete(config.baseUrl + "/usuario/" + id);
    }

    var _editaUsuario = function (id, usuario) {
        return $http.put(config.baseUrl + "/usuario/" + id, usuario);
    }

    var _getRating = function (id){
        return $http.get(config.baseUrl + "/rating/" + id);
    };

    var _saveRating = function (id, rating){
        return $http.post(config.baseUrl + "/rating", id, rating);
    };

    return {
        getPerguntas: _getPerguntas,
        getResposta: _getResposta,
        getRespostas: _getRespostas,
        getLogin: _getLogin,
        getUsuarios: _getUsuarios,
        getUsuario: _getUsuario,
        editaUsuario: _editaUsuario,
        savePergunta: _savePergunta,
        saveResposta: _saveResposta,
        saveLogin: _saveLogin,
        saveUsuarios: _saveUsuarios,
        apagarUsuario: _apagarUsuario,
        pushPerguntas: _pushPerguntas,
        listAllPerguntas : _listAllPerguntas,
        getRating: _getRating,
        saveRating: _saveRating,
        getPainel: _getPainel
    };
});