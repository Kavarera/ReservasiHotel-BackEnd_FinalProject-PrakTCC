const Room = require('../models/room');
const RoomType = require('../models/roomtypes');
const Role = require('../models/role');
const Employee = require('../models/employee');
const sequelize = require('./connection');


RoomType.hasMany(Room,{
    foreignKey:{
        name:'RoomTypeId',
        allowNull: false
    }
});
Room.belongsTo(RoomType,{
    foreignKey:{
        name:'RoomTypeId',
        allowNull: false
    }
});

Role.hasMany(Employee,{
    foreignKey:{
        name:'RoleId',
        allowNull: false
    }
});
Employee.belongsTo(Role,{
    foreignKey:{
        name:'RoleId',
        allowNull: false
    }
});

const Association = async () => {
    try {
        await sequelize.sync({});
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = Association;