const express = require('express');
const { getRoomTypeById, getAllRoomTypes,
  insertRoomType, removeRoomType,
  updateRoomTypePrice } = require('../handlers/roomtypesHandler');
const {getRooms, insertRoom} = require('../handlers/roomHandler');
const router = express.Router();
require('../models/roomtypes');
require('../models/room');


  router.get('/',(req,res,next)=>{
    res.status(200).json({
      message: "API Active"
    })
  });
// Read All RoomTypes
router.get('/roomtypes', getAllRoomTypes);

// Read RoomType by ID
router.get('/roomtypes/:id', getRoomTypeById);


// Read All Room
router.get('/rooms', getRooms);

router.post(`/room`,insertRoom);

router.post('/roomtype',insertRoomType)

router.put('/roomtype', updateRoomTypePrice)

router.delete(`/roomtype`,removeRoomType)

router.use('*',(req,res)=>{
  res.status(404).json({
    message:'Wrong endpoint'
  })
});

module.exports=router;