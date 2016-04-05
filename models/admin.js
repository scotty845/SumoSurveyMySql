'use strict';



module.exports = function ( sequelize, DataTypes ) {
    var surveyusers = sequelize.define( 'surveyusers', {
		//id:DataTypes.INTEGER,
        uname: DataTypes.STRING,
		pass:DataTypes.STRING
		
		
    }, 	{
			
        classMethods: {
            associate: function ( models ) {
				
                
              surveyusers.hasMany( models.surveyusers );
	           
				
            }
        }
		
		
    } );

	
	
		
    return surveyusers;
};