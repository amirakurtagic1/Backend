const Sequelize = require('sequelize');

module.exports = function(sequelize,DataType){
    const Student = sequelize.define('student', {
        ime: Sequelize.STRING,
        index: Sequelize.STRING
    });
    return Student;
};
   
