const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const RoomType = sequelize.define('RoomType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    timestamps: false
});

// Handler functions


module.exports = RoomType;
