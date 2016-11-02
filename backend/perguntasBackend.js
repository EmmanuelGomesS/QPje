var express = require('express');
var Sequelize = require ('sequelize');
var bodyParser = require ('body-parser');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = 'superSecret';

var app = express();


var  connection = new Sequelize('QpjeTest', 'root', '');

var Pergunta = connection.define('pergunta', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING
  },
  mail: {
    type: Sequelize.STRING
  },
  pergunte: {
    type: Sequelize.TEXT
  }
});

var Resposta = connection.define('resposta', {

  nome: {
    type: Sequelize.STRING
  },
  mail: {
    type: Sequelize.STRING
  },
  resposta: {
    type: Sequelize.TEXT
  }

});

Resposta.belongsTo(Pergunta);

var Usuario = connection.define('usuario', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: Sequelize.STRING
  },
  sexo: {
    type: Sequelize.ENUM('M', 'F')
  },
  senha: {
    type: Sequelize.STRING
  },
  mail: {
    type: Sequelize.STRING
  },
  oab: {
    type: Sequelize.STRING
  },
  estado: {
    type: Sequelize.STRING
  },
  telefone: {
    type: Sequelize.STRING
  },
  telefone2: {
    type: Sequelize.STRING
  }
});


var Rating = connection.define('rating', {

  rating: {
    type: Sequelize.INTEGER
  },
  ratingid: {
    type: Sequelize.INTEGER
  }

});


/*
connection.sync().then(function(){
  Usuario.create({
    nome: 'Pablo',
    sexo: 'M',
    senha: '12345',
    mail: 'pablo@gmail.com',
    oab: '12345',
    estado: 'PB - Paraíba',
    telefone: '83987454545',
    telefone2: '83987454343'
  });
});
*/

//CRIAÇÃO DE UMA TABELA pergunta

/*
connection.sync().then(function(){
  Pergunta.create({
    nome: 'Pablo',
    mail: 'pablo@gmail.com',
    pergunte: 'deu certo?'
  });
});
*/



//CRIAÇÃO DE UMA TABELA resposta

/*
connection.sync().then(function(){
  Resposta.create({
    nome: 'Pedro',
    mail: 'pedro@gmail.com',
    resposta: 'não é assim',
    perguntumId: 2
  });
});

*/

/*
connection.sync().then(function(){
  Rating.create({
    rating: 2,
    ratingid: 24
  });
});
*/

app.use(express.static(__dirname + '/public'));
app.use(bodyParser());
app.use('/', router);


router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



//REQUISIÇÕES PARA PERGUNTAS

var perPage = 3;
var page = 0;


router.get('/perguntas/page/:id', function(req, res) {

  page = req.params.id;

  Pergunta.findAll({
    attributes: ['nome', 'mail', 'pergunte', 'id'],
    raw: true,
    offset: perPage * page,
    limit: perPage
  })
  .then(function(perguntas){

    res.send(perguntas)
  })
});

router.get('/perguntas/:id', function(req, res) {
  Pergunta.findAll({
    attributes: ['nome', 'mail', 'pergunte', 'id'],
    raw: true,
    where: {
      id: req.params.id
    }

  })
  .then(function(perguntas){

    res.send(perguntas)
  })
});

router.get('/perguntas', function(req, res) {
  Pergunta.findAll({
    attributes: ['id'],
    raw: true

  })
  .then(function(perguntas){

    res.send(perguntas)
  })
});


router.post('/perguntas', function(req, res) {
  connection.sync().then(function(){
  Pergunta.create({
    nome: req.body.nome,
    mail: req.body.mail,
    pergunte: req.body.pergunte
  });
});
  res.json(true);
});

router.get('/', function(req, res){
	res.send('im the home page!');
});

router.put('/perguntas/:id', function(req, res){
  Pergunta.find({
    where: {
      id: req.params.id
    }

  })
  .then(function(perguntas){

    perguntas.updateAttributes({
      nome: req.body.nome,
      mail: req.body.mail,
      pergunte: req.body.pergunte
    })
  })
  res.json(true);
});

router.delete('/perguntas/:id', function(req, res){
  Pergunta.find({
    where: {
      id: req.params.id
    }

  })
  .then(function(perguntas){

   perguntas.destroy().then(function(perguntas){
    if(perguntas && pereguntas.deletedAt){

      res.json(true);
    }

   })

  })
});



// REQUISIÇÕES PARA RESPOSTAS



router.get('/respostas/:id', function(req, res) {
  Resposta.findAll({
    attributes: ['nome', 'mail', 'resposta', 'id'],
    raw: true,
    where:{
      perguntumId: req.params.id
    }

  })
  .then(function(respostas){

    res.send(respostas)
  })
});

router.post('/respostas/:id', function(req, res) {
  connection.sync().then(function(){
  Resposta.create({
    nome: req.body.nome,
    mail: req.body.mail,
    resposta: req.body.resposta,
    perguntumId: req.params.id
  });
});
  res.json(true);
});

router.put('/respostas/:id', function(req, res){
  Resposta.find({
    where: {
      id: req.params.id
    }

  })
  .then(function(respostas){

    respostas.updateAttributes({
      nome: req.body.nome,
      mail: req.body.mail,
      resposta: req.body.resposta
    })
  })
  res.json(true);
});

router.delete('/respostas/:id', function(req, res){
  Resposta.find({
    where: {
      id: req.params.id
    }

  })
  .then(function(respostas){

   respostas.destroy().then(function(respostas){
    if(respostas && respostass.deletedAt){

      res.json(true);
    }

   })

  })
});


// Requisições para usuários

router.post('/usuario', function(req, res) {
  connection.sync().then(function(){
  Usuario.create({
    nome: req.body.nome,
    sexo: req.body.sexo,
    senha: req.body.senha,
    mail: req.body.mail,
    oab: req.body.oab,
    estado: req.body.estado,
    telefone: req.body.telefone,
    telefone2: req.body.telefone2
  });
});
  res.json(true);
});

router.get('/usuario', function(req, res) {
  Usuario.findAll({
    attributes: ['id','nome', 'sexo','senha', 'mail', 'oab', 'estado','telefone','telefone2'],
    raw: true
  })
  .then(function(usuarios){

    res.send(usuarios)
  })
});

router.get('/usuario/:id', function(req, res) {
  Usuario.findAll({
    attributes: ['id','nome', 'sexo','senha', 'mail', 'oab', 'estado','telefone','telefone2'],
    raw: true,
    where: {
      id: req.params.id
    }
  })
  .then(function(usuarios){

    res.send(usuarios)
  })
});

router.put('/usuario/:id', function(req, res){
  Usuario.find({
    where: {
      id: req.params.id
    }

  })
  .then(function(usuarios){

    usuarios.updateAttributes({
      nome: req.body.nome,
      sexo: req.body.sexo,
      senha: req.body.senha,
      mail: req.body.mail,
      oab: req.body.oab,
      estado: req.body.estado,
      telefone: req.body.telefone,
      telefone2: req.body.telefone2
    })
  })
  res.json(true);
});


router.delete('/usuario/:id', function(req, res){
  Usuario.find({
    where: {
      id: req.params.id
    }

  })
  .then(function(usuarios){

   usuarios.destroy().then(function(usuarios){
    if(usuarios && usuarios.deletedAt){

      res.json(true);
    }

   })

  })
});

router.get('/painel/:oab', function(req, res) {
  Usuario.findAll({
    attributes: ['id','nome', 'sexo','senha', 'mail', 'oab', 'estado','telefone','telefone2'],
    raw: true,
    where: {
      oab: req.params.oab
    }
  })
  .then(function(usuarios){

    res.send(usuarios)
  })
});

router.get('/rating/:id', function(req, res) {
  Rating.findAll({
    attributes: ['rating'],
    raw: true,
    where: {
      ratingid: req.params.id
    }

  })
  .then(function(ratingV){

    res.send(ratingV)
  })
});


router.post('/rating', function(req, res) {
  connection.sync().then(function(){
  Rating.create({
    rating: req.body.rating,
    ratingid: req.body.id
  });
});
  res.json(true);
});


router.post('/logins', function(req, res) {

  Usuario.find({
    where: {oab: req.body.oab}
  })
  .then(function(usuario) {


    if (!usuario) {

    } else if (usuario) {

      if (usuario.senha != req.body.senha) {
        res.json({ success: false, message: 'Senha incorreta' });

      } else {

        var token = jwt.sign({usuario: usuario.nome}, 'superSecret', {expiresIn: 120});

        res.send(token);
      }

    }

  });
});


router.use('/perguntas', function(req, res, next) {


  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falha ao auntenticar o token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
        success: false,
        message: 'Não há token'
    });

  }
});

router.use('/respostas', function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falha ao auntenticar o token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
        success: false,
        message: 'Não há token'
    });

  }
});

router.use('/respostas/:id', function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falha ao auntenticar o token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
        success: false,
        message: 'Não há token'
    });

  }
});

router.use('/respostas/:id', function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falha ao auntenticar o token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
        success: false,
        message: 'Não há token'
    });

  }
});

router.use('/usuario/:id', function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, 'superSecret', function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Falha ao auntenticar o token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });

  } else {

    return res.status(403).send({
        success: false,
        message: 'Não há token'
    });

  }
});


app.listen(1337, function(){

	console.log('ready on http://127.0.0.1:1337');
});

