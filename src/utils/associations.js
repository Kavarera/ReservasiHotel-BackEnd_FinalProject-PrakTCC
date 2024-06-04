const Room = require('../models/room');
const RoomType = require('../models/roomtypes');
const Role = require('../models/role');
const Employee = require('../models/employee');
const Customer = require('../models/customer');
const Booking = require('../models/booking');
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

//For Booking
// Room.hasMany(Booking,{
//     foreignKey:{
//         name:'RoomId',
//         allowNull:false
//     }
// });

Customer.hasMany(Booking,{
    foreignKey:{
        name:'CustomerId',
        allowNull:false
    }
});
Booking.belongsTo(Customer,{
    foreignKey:{
        name:'CustomerId',
        allowNull:false
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