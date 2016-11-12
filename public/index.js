'use strict';

var express = require('express');
var cors = require('cors');

var server = express();
var PORT = process.env.PORT || 3000;
server.use(cors());

server.get('/', function (request, response) {

  var name = null;

  if (request.query.hasOwnProperty('fullname') && typeof request.query.fullname === 'string') {
    name = request.query.fullname.trim();
  }

  if (name !== null && name.match(/^(?:(?:[а-яa-zó](\.|')?)+(\s?)+){1,3}$/i) !== null) {
    switch (name.split(/\s+/).length) {
      case 3:
        if (/^[A-ZА-Я][a-zа-я]+\s[A-ZА-Я]\.\s[A-ZА-Я]\.$/.test(name)) {
          break;
        }
        name = '' + name.split(/\s+/)[2][0].toUpperCase() + name.split(/\s+/)[2].substring(1).toLowerCase() + ' ' + name[0].toUpperCase() + '. ' + name.split(/\s+/)[1][0].toUpperCase() + '.';
        break;
      case 2:
        name = '' + name.split(/\s+/)[1][0].toUpperCase() + name.split(/\s+/)[1].substring(1).toLowerCase() + ' ' + name[0].toUpperCase() + '.';
        break;
      default:
    }
    console.log(name.split(/\s+/), name.split(/\s+/).length);
  } else {
    name = null;
  }

  if (name !== null) {
    response.send(name);
  } else {
    response.send('Invalid fullname');
  }
});

server.listen(PORT, function () {
  console.log('Server started on port ' + PORT);
});