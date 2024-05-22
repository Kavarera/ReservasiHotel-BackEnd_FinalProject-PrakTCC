const Room = require('../models/room');

const getRooms = async (req,res)=>{
    try {
        const rooms = await Room.findAll({
            where:{
                available: false
            }
        });
        if(rooms.length <= 0) {
          res.status(200).json({
            length: rooms.length,
            data: null
          });
        } else {
          res.status(200).json({
            length: rooms.length,
            data: rooms // Mengirimkan rooms langsung sebagai respons
          });
        }
      } catch (error) {
        res.status(400).json({ 
          message: `error : babi`
        });
      }
};


const insertRoom = async (req,res) => {
    try{
        const { name, roomNumber, floor, available, RoomTypeId } = req.body;
        await Room.create({
            name,roomNumber,floor,available,RoomTypeId
        });
        res.status(201).json({
            status : `Success`
        })
    } catch(e){
        res.status(400).json({
            status : `Failed`,
            message : `Error : ${e.message}`
        })
    }
}



module.exports = {
    getRooms,
    insertRoom
};