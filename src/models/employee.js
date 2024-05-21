const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Employee = sequelize.define("Employee",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull:false,
        autoIncrement:true,
    },
    fullname:{
        type:DataTypes.STRING,
        allowNull: false,
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
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    }
},{
    timestamps: false
});

module.exports = Employee;