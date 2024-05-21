const Room = require('../models/room');
const RoomType = require('../models/roomtypes');
const sequelize = require('./connection');


RoomType.hasMany(Room);
Room.belongsTo(RoomType);

const Association = async () => {
    try {
        await sequelize.sync({});
    } catch (e) {
        console.log(e.message);
    }
}

module.exports = Association;