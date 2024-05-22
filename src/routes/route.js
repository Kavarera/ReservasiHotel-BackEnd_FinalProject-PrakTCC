const express = require('express');
// Roomtypes
const { getRoomTypeById, getAllRoomTypes,
  insertRoomType, removeRoomType,
  updateRoomTypePrice } = require('../handlers/roomtypesHandler');
// Rooms
  const {getRooms, insertRoom} = require('../handlers/roomHandler');
// Token
const verifyToken = require('../middlewares/auth');
// Employee
const {signupEmployee,
  loginEmployee} = require('../handlers/employeeHandler');
// Booking
const {getBookings,
  getBookingByRoomId,
  insertBooking} = require('../handlers/bookingHandler');


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

//Read All Booking, ITS TOP SECRET!
router.get('/bookings',getBookings);

router.get('/bookings/:RoomId',getBookingByRoomId);

// insert a new booking
router.post('/booking',insertBooking);
//insert a new room
router.post(`/room`,verifyToken,insertRoom);
//insert a new room type
router.post('/roomtype',verifyToken,insertRoomType)
//update roomtype price
router.put('/roomtype',verifyToken, updateRoomTypePrice)
//deleting roomtype
router.delete(`/roomtype`,verifyToken,removeRoomType)

//Employee
router.post('/signup',signupEmployee);
router.post('/signin',loginEmployee);

router.use('*',(req,res)=>{
  res.status(404).json({
    message:'Wrong endpoint'
  })
});

module.exports=router;