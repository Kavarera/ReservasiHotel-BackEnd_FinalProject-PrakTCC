const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Customer = sequelize.define('Customer',{
    id:{
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true
    },
    nik:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    fullname:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:`fullname can't be empty`
            },
            notOnlySpaces(value){
                if(!value.trim().length){
                    throw new Error(`Fullname can't be empty`);
                }
            }
        }
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:`phone can't be empty`
            },
            notOnlySpaces(value){
                if(!value.trim().length){
                    throw new Error(`phone can't be empty`);
                }
            }
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:`fullname can't be empty`
            },
            notOnlySpaces(value){
                if(!value.trim().length){
                    throw new Error(`email can't be empty`);
                }
            }
        }
    }
});

module.exports = Customer;