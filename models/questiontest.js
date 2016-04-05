'use strict';

module.exports = function ( sequelize, DataTypes ) {
    var Question = sequelize.define( 'Question', {
        questionText: DataTypes.STRING
    }, {
        classMethods: {
            associate: function ( models ) {
                Question.hasMany( models.Answer );
            }
        }
    } );

    return Question;
};



var models = require( '../models' );



