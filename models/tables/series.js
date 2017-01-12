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
        publishState              : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
            field                 : 'publish_state',
        },
        isOneTicket               : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
            field                 : 'is_one_ticket',
        },
        isHot                     : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
            field                 : 'is_hot',
        },
        hotLevel                  : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 5,
            field                 : 'hot_level',
        },
        isDailySerie              : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
            field                 : 'is_daily_serie',
        },
        desc                      : {
            type                  : Sequelize.TEXT,
            defaultValue          : null,
        },
        imageUrl                  : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
            field                 : 'image_url',
        },
        startDate                 : {
            type                  : Sequelize.DATEONLY,
            defaultValue          : null,
            field                 : 'start_date',
        },
        endDate                   : {
            type                  : Sequelize.DATEONLY,
            defaultValue          : null,
            field                 : 'end_date',
        },
        mainPondDesc              : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
            field                 : 'main_pond_desc',
        },
        mainBuyinDesc             : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
            field                 : 'main_buyin_desc',
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
        organizersId              : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'organizers_id',
        },
        casinosId                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'casinos_id',
        },
        toursId                   : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            defaultValue          : null,
            field                 : 'tours_id',
        },
    }, {
        tableName: 'series',
        freezeTableName: true,
        timestamps: false,
        scopes: {
          hot: {
              attributes: ['id','name','imageUrl','startDate','endDate','mainPondDesc','mainBuyinDesc']
          },
          default: {
              attributes: ['name', 'startDate','endDate','isOneTicket']
          },
          introduce: {
              attributes: ['name', 'startDate', 'endDate', 'desc']
          }
        },
    })
}
