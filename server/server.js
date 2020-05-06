var express = require('express');
const si = require('systeminformation');
var cors = require('cors');
var app = express();

app.use(cors());
app.get('/', function (req, res) {
  si.mem().then(data =>  res.send( data ) );
});

app.listen(4000, function () {
  console.log('API inicializada en el puerto 4000');
  si.mem().then(data => console.log(data));
});