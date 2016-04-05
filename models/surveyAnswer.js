'use strict';

module.exports = function ( sequelize, DataTypes ) {
    var SurveyAnswer = sequelize.define( 'SurveyAnswer', {
        guestIP: DataTypes.STRING
    }, {
        classMethods: {
            associate: function ( models ) {
                SurveyAnswer.belongsTo( models.Answer );
                SurveyAnswer.belongsTo( models.Question );
            }
        }
    } );

    return SurveyAnswer;
};

