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
        publish_state             : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
        },
        is_e_ticket               : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
        },
        is_main                   : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
        },
        is_promotion              : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
            defaultValue          : 0,
        },
        is_one_ticket_match       : {
            type                  : Sequelize.BOOLEAN,
            allowNull             : false,
        },
        image_url                 : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        match_day                 : {
            type                  : Sequelize.DATEONLY,
            defaultValue          : null,
        },
        start_time                : {
            type                  : Sequelize.TIME,
            defaultValue          : null,
        },
        close_reg_time            : {
            type                  : Sequelize.TIME,
            defaultValue          : null,
        },
        real_buyin                : {
            type                  : Sequelize.DECIMAL(10,2),
            defaultValue          : 0,
        },
        rake_buyin                : {
            type                  : Sequelize.DECIMAL(10,2),
            defaultValue          : 0,
        },
        abs_discount              : {
            type                  : Sequelize.DECIMAL(7,2),
            defaultValue          : null,
        },
        rel_discount              : {
            type                  : Sequelize.DECIMAL(7,2),
            defaultValue          : null,
        },
        unit_price                : {
            type                  : Sequelize.DECIMAL(10,2),
            defaultValue          : null,
        },
        pond                      : {
            type                  : Sequelize.INTEGER,
            defaultValue          : null,
        },
        player_amount             : {
            type                  : Sequelize.INTEGER,
            defaultValue          : null,
        },
        desc                      : {
            type                  : Sequelize.TEXT,
            defaultValue          : null,
        },
        remark                    : {
            type                  : Sequelize.STRING(255),
            defaultValue          : null,
        },
        created_at: {
            type                  : Sequelize.DATE,
            allowNull             : false,
            defaultValue          : Sequelize.NOW,
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
        series_id                 : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
        },
        match_types_id            : {
            type                  : Sequelize.INTEGER.UNSIGNED,
            allowNull             : false,
        },
    }, {
        tableName: 'matches',
        freezeTableName: true,
        timestamps: false
    })
}
