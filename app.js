const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const path = require('path');
const PORT = 8080; 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//database
const db = require('./config/database');

  //provjera da li ce se baza uspjesno povezati
/*db.authenticate()
.then(() => console.log("Database connected.."))
.catch(err => console.log('Error: ' + err));
*/
db.sequelize.sync({force:true}).then(() => console.log("Kreirane tabele")).catch(err => console.log('Error pri kreiranju tabela: ' + err));

/*
app.get('/v2/student', function(req, res) {
    res.sendStatus(200);
});
*/
app.use('/v2/student', require('./rute/student'));
app.use('/v2/aktivnost', require('./rute/aktivnost'));
app.use('/v2/dan', require('./rute/dan'));
app.use('/v2/grupa', require('./rute/grupa'));
app.use('/v2/predmet', require('./rute/predmet'));
app.use('/v2/tip', require('./rute/tip'));

app.get('/student', (req, res) => {
  res.sendFile(path.join(__dirname + '/studenti.html'));
});


app.listen(PORT, () => console.log(`Server on port ${PORT} ..`));