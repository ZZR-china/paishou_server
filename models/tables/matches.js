/*
 * 赛事表
 */
const Sequelize = require('sequelize')

module.exports = (db) => {
    return db.define('matches', {
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
        ETicket                   : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
            field                 : 'is_e_ticket',
        },
        isMain                   : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
            field                 : 'is_main',
        },
        isPromotion              : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
            field                 : 'is_promotion',
        },
        isOneTicketMatch       : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            field                 : 'is_one_ticket_match',
        },
        imageUrl                 : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
            field                 : 'image_url',
        },
        matchDay                 : {
            type                  : Sequelize.DATEONLY,
            defaultValue          : null,
            field                 : 'match_day',
        },
        startTime                : {
            type                  : Sequelize.TIME,
            defaultValue          : null,
            field                 : 'start_time',
        },
        closeRegTime            : {
            type                  : Sequelize.TIME,
            defaultValue          : null,
            field                 : 'close_reg_time',
        },
        realBuyin                : {
            type                  : Sequelize.DECIMAL(10,2),
            defaultValue          : 0,
            field                 : 'real_buyin',
        },
        rakeBuyin                : {
            type                  : Sequelize.DECIMAL(10,2),
            defaultValue          : 0,
            field                 : 'rake_buyin',
        },
        absDiscount              : {
            type                  : Sequelize.DECIMAL(7,2),
            defaultValue          : null,
            field                 : 'abs_discount',
        },
        relDiscount              : {
            type                  : Sequelize.DECIMAL(7,2),
            defaultValue          : null,
            field                 : 'rel_discount',
        },
        unitPrice                : {
            type                  : Sequelize.DECIMAL(10,2),
            defaultValue          : null,
            field                 : 'unit_price',
        },
        pond                      : {
            type                  : Sequelize.INTEGER,
            defaultValue          : null,
        },
        playerAmount             : {
            type                  : Sequelize.INTEGER,
            defaultValue          : null,
            field                 : 'player_amount',
        },
        desc                      : {
            type                  : Sequelize.TEXT,
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
        organizersId             : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'organizers_id',
        },
        seriesId                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'series_id',
        },
        matchTypesId            : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
            field                 : 'match_types_id',
        },
    }, {
        tableName: 'matches',
        freezeTableName: true,
        timestamps: false,
        scopes: {
            regular: {
                attributes: [
                    'name',
                    'startTime',
                    'realBuyin',
                    'rakeBuyin',
                    'absDiscount',
                    'relDiscount',
                    'unitPrice',
                    'remark',
                ]
            },
        },
    })
}
