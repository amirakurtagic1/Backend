const Sequelize = require('sequelize');
const path = require('path');
const db = {};
const sequelize = new Sequelize('bwt2091', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import modela
db.predmet = require(path.join(__dirname, '../modeli/predmet.js'))(sequelize, Sequelize.DataTypes)
//db.predmet = sequelize.import(__dirname + '../modeli/predmet.js');
db.grupa = require(path.join(__dirname, '../modeli/grupa.js'))(sequelize, Sequelize.DataTypes)
//db.grupa = sequelize.import(__dirname + '../modeli/grupa.js');
db.aktivnost = require(path.join(__dirname, '../modeli/aktivnost.js'))(sequelize, Sequelize.DataTypes)
//db.aktivnost = sequelize.import(__dirname + '../modeli/aktivnost.js');
db.dan = require(path.join(__dirname, '../modeli/dan.js'))(sequelize, Sequelize.DataTypes)
//db.dan = sequelize.import(__dirname + '../modeli/dan.js');
db.tip = require(path.join(__dirname, '../modeli/tip.js'))(sequelize, Sequelize.DataTypes)
//db.tip = sequelize.import(__dirname + '../modeli/tip.js');
db.student = require(path.join(__dirname, '../modeli/student.js'))(sequelize, Sequelize.DataTypes)
//db.student = sequelize.import(__dirname + '../modeli/student.js');


//relacije

//Predmet 1-N Grupa: jedan predmet moze imati vise grupa
db.predmet.hasMany(db.grupa,{as: 'GrupePredmeta'});

//Aktivnost N-1 Predmet: vise aktivnosti ima jedan predmet, jedan predmet ima vise aktivnosti
db.predmet.hasMany(db.aktivnost,{as:'AktivnostiPredmeta'});

//Aktivnost N-0 Grupa, vise aktivnosti moze imati 0 ili jednu grupu, 0,1 grupa ima vise aktivnosti
db.grupa.hasMany(db.aktivnost,{as:'AktivnostiGrupe'}); 

//Aktivnost N-1 Dan, vise aktivnosti moze biti odrzano za jedan dan, za jedan dan moze biti odrzano vise aktivnosti
db.dan.hasMany(db.aktivnost,{as:'AktivnostiDana'});

//Aktivnost N-1 Tip, vise aktivnosti mogu imati jedan tip, tj jedan tip moze imati vise aktivnosti
db.tip.hasMany(db.aktivnost,{as:'AktivnostiTipa'});

//Student N-M Grupa: student moze imati vise grupa, ali i jedna grupa moze imati vise studenata
db.studentGrupa = db.student.belongsToMany(db.grupa,{as:'grupe', through:'student_grupa', foreignKey:'studentId'});
db.grupa.belongsToMany(db.student,{as:'studenti', through:'student_grupa', foreignKey:'grupaId'});

  module.exports = db;