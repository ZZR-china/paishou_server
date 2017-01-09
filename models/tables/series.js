/*
 * 系列赛表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('series', {
        id                        : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            primaryKey            : true,
            autoIncrement         : true,
        },
        name                      : {
            type                  : Sequelize.STRING(255),
            allowNull             : false,
        },
        publish_state             : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
        },
        is_one_ticket               : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
        },
        is_hot                    : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
        },
        hot_level                 : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 5,
        },
        is_daily_serie            : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
        },
        desc                      : {
            type                  : Sequelize.TEXT,
            defaultValue          : null,
        },
        image_url                 : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        start_date                : {
            type                  : Sequelize.DATEONLY,
            defaultValue          : null,
        },
        end_date                  : {
            type                  : Sequelize.DATEONLY,
            defaultValue          : null,
        },
        main_pond_desc            : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        main_buyin_desc           : {
            type                  : Sequelize.STRING(255),
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
        remark                    : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        created_at: {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
		    type                  : 'TIMESTAMP',
            onUpdate              : Sequelize.NOW,
    	    defaultValue          : Sequelize.NOW,
        },
        organizers_id             : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
        },
        casinos_id                : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
        },
        tours_id                  : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
        },
    }, {
        tableName: 'series',
        freezeTableName: true,
        timestamps: false,
        scopes: {
          hot: {
              attributes: ['id','name','image_url','start_date','end_date','main_pond_desc','main_buyin_desc']
          },
          default: {
              attributes: ['name', 'start_date','end_date']
          },
          introduce: {
              attributes: ['name', 'start_date', 'end_date', 'desc']
          }
        },
    })
}
