/*
 * 举办方表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('organizers', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        name                      : {
            type                  : Sequelize.STRING(45),
            allowNull             : false,
        },
        contact_person            : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
        },
        phone                     : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
        },
        website                   : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        created_at: {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
    	    type                  : Sequelize.DATE,
    		onUpdate              : Sequelize.NOW,
            defaultValue          : Sequelize.NOW,
        },
        casinos_id                : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
        },
    }, {
        tableName: 'organizers',
        freezeTableName: true,
        timestamps: false
    })
}
