const Sequelize = require('sequelize');

module.exports = function(sequelize,DataType){
    const Grupa = sequelize.define('grupa', {
        naziv: Sequelize.STRING
    });
    return Grupa;
};
