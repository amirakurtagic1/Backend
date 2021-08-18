const Sequelize = require('sequelize');

module.exports = function(sequelize,DataType){
const Tip = sequelize.define('tip', {
    naziv: Sequelize.STRING
});
return Tip;
};
