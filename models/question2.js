'use strict';

module.exports = function ( sequelize, DataTypes ) {
    var Question = sequelize.define( 'Question', {
        questionText: DataTypes.STRING,
		createdBy: DataTypes.INTEGER
    }, {
        classMethods: {
           // associate: function ( models ) {
             //   Question2.hasMany( models.Answer );
            //}
        }
    } );

    return Question;
};