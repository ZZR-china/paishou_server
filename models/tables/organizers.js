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
        contactPerson            : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
            field                 : 'contact_person',
        },
        phone                     : {
            type                  : Sequelize.STRING(45),
            defaultValue          : null,
        },
        website                   : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        createdAt: {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.NOW,
            field                 : 'created_at',
        },
        updatedAt: {
    	    type                  : 'TIMESTAMP',
    		onUpdate              : Sequelize.NOW,
            defaultValue          : Sequelize.NOW,
            field                 : 'updated_at',
        },
        casinosId                : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
            field                 : 'casinos_id',
        },
    }, {
        tableName: 'organizers',
        freezeTableName: true,
        timestamps: false
    })
}
