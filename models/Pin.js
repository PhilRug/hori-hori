const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pin extends Model { }

Pin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        // //import user id and import plan information
        // plant_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'plant',
        //         key: 'id',
        //     },
        // },
        plant: {
            type: DataTypes.STRING,
            allowNull: false,
            // references: {
            //     model: 'plant',
            //     key: 'name',
            // },
        },
        description: {
            type: DataTypes.STRING,
            // references: {
            //     model: 'plant',
            //     key: 'description',
            // },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        date_created: {
            type: DataTypes.DATE,
            // allowNull: false,
            defaultValue: DataTypes.NOW,
          },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'pin',
    }
);

module.exports = Pin;
