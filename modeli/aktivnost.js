const Sequelize = require('sequelize');


module.exports = function(sequelize,DataType){
const Aktivnost = sequelize.define('aktivnost', {
    naziv: Sequelize.STRING,
    pocetak: Sequelize.FLOAT,
    kraj: Sequelize.FLOAT
});
return Aktivnost;
};
