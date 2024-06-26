const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Role = sequelize.define('Role',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    timestamps:false
});

module.exports=Role;