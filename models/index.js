'use strict';

var fs = require( 'fs' );
var path = require( 'path' );
var Sequelize = require( 'sequelize' );
var config = require( __dirname + '/../config/config.json' )[ 'db' ];
var sequelize = new Sequelize( config.database, config.username, config.password, config );
var db = {};


//sequelize.sync({ force: true })

fs.readdirSync( __dirname ).filter( function ( file ) {
    return ( file.indexOf( '.' ) !== 0 ) && ( file !== 'index.js' );

} ).forEach( function ( file ) {
    var model = sequelize.import( path.join( __dirname, file ) );
    db[ model.name ] = model;
    
} );

Object.keys( db ).forEach( function ( modelName ) {
    if ( 'associate' in db[ modelName ] ) {
        db[ modelName ].associate( db );
    }
} );


db.sequelize = sequelize;
db.Sequelize = Sequelize;




//sequelize.sync({ force: true })
//sequelize.sync()

//sequelize.migrate()


module.exports = db;