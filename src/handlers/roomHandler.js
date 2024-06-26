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
          message: `error : ${ error.message}`
        });
      }
};
const getRoomsAdmin = async (req,res)=>{
    try {
        const rooms = await Room.findAll({
            where:{
                available: true
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
          message: `error : ${ error.message}`
        });
      }
};


const insertRoom = async (req,res) => {
    try{
        if(req.employee.RoleId !== 1){
          return res.sendStatus(403); // Forbidden
        }

        
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

const deleteRoom = async (req,res)=>{
  try{
    if(req.employee.RoleId!==1){
      return res.sendStatus(403);
    }
    const { id } = req.body;
    await Room.destroy({
      where:{
        id:id
      }
    });
    res.status(200).json({
      status : `Success`
  });
  }catch(e){
    res.status(400).json({
      status : `Failed`,
            message : `Error : ${e.message}`
    });
  }
}



module.exports = {
    getRooms,
    insertRoom,getRoomsAdmin, deleteRoom
};