const Sequelize = require('sequelize');

module.exports = function(sequelize,DataType){
    const Dan = sequelize.define('dan', {
        naziv: Sequelize.STRING
    });
    return Dan;
};
    