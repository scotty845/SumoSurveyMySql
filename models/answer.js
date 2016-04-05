'use strict';

module.exports = function ( sequelize, DataTypes ) {
    var Answer = sequelize.define( 'Answer', {
        answerText: DataTypes.STRING
    }, {
        classMethods: {
            associate: function ( models ) {
                Answer.belongsTo( models.Question, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false
                    }
                } );

                Answer.hasMany( models.SurveyAnswer );
            }
        }
    } );

    return Answer;
};