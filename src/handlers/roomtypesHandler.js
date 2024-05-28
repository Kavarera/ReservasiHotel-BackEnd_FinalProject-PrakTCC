
const RoomType = require('../models/roomtypes');

const getAllRoomTypes = async (req,res,next)=>{
    try {
        const rooms = await RoomType.findAll();
        res.status(200).json({
          length: rooms.length,
          data: rooms.length <=0 ? null : rooms
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
} 

const getRoomTypeById = async (req, res) => {
    try {
      const room = await RoomType.findByPk(req.params.id);
      if (room) {
        res.status(200).json({data: room});
      } else {
        res.status(404).json({ message: 'Room not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


const insertRoomType = async(req,res) =>{
    try{
        if(req.employee.RoleId !== 1){
          return res.sendStatus(403);
        }


        const {name,price,imageUrl} = req.body;
        await RoomType.create({
            name,price,imageUrl
        });
        res.status(201).json({
            status:`Success`
        })
    }catch(e){
        res.status(400).json({
            status: `Failed`,
            message : `Error : ${e.message}`
        })
    }
}

const updateRoomTypePrice = async(req,res)=>{
    try{
      if(req.employee.RoleId !== 1){
        console.log(req.employee.RoleId);
        return res.sendStatus(403);
      }


      const {id,price,imageUrl} = req.body;
      const currentRT = await RoomType.findByPk(id);
      currentRT.update({
        price:price,
        imageUrl:imageUrl
      });
      res.status(200).json({
        status : 'Success',
        roomtype: currentRT
      })
    }catch(e){
        res.status(400).json({
            status : `Failed`,
            message : `Error : ${e.message}`
        })
    }
  }

const removeRoomType = async (req,res)=>{
    try{
        if(req.employee.RoleId !== 1){
          return res.sendStatus(403);
        }



        const {id} = req.body;
        await RoomType.destroy({
            where:{
                id: id
            }
        });
        res.status(200).json({
            status : `Success`,
        })
    }catch(e){
        res.status(400).json({
            status : `Failed`,
            message: `Error : ${e.message}`
        })
    }
}
module.exports={
    getAllRoomTypes,
    getRoomTypeById,
    insertRoomType,
    updateRoomTypePrice,
    removeRoomType
}