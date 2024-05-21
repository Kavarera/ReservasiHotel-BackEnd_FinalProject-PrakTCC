const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');
const RoomType = require('./roomtypes');

const Room = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roomNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    floor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    timestamps: false
});

// Handler Functions
// async function getRooms() {
//     return await Room.findAll({
//         where: {
//             available: false
//         }
//     });
// }

module.exports = Room
