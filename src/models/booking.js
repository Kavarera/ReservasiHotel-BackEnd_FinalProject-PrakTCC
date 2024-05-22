const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Booking = sequelize.define('Booking',{
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
    },
    kode_booking:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    checkin:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    days:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports=Booking;