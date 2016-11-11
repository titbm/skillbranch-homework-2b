const express = require('express');
const cors = require('cors');

const server = express();
const PORT = process.env.PORT || 3000;
server.use(cors());


server.get('/', function (request, response) {

  let name = null;

  if (request.query.hasOwnProperty('fullname') && typeof request.query.fullname === 'string') {
    name = request.query.fullname;
  }

  if (name !== null && name.match(/^([A-ZА-Я](\.|[a-zа-яó]+)\s?){1,3}$/) !== null) {
    switch (name.split(' ').length) {
      case 3:
        name = `${name.split(' ')[2]} ${name[0]}. ${name.split(' ')[1][0]}.`;
        break;
      case 2:
        name = `${name.split(' ')[1]} ${name[0]}.`;
        break;
      default:
    }
  } else { name = null; }

  if (name !== null) {
    response.send(name);
  } else {
    response.send('Invalid fullname');
  }
});

server.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
