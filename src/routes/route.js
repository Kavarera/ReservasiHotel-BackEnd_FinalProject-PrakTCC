const express = require('express');
// Roomtypes
const { getRoomTypeById, getAllRoomTypes,
  insertRoomType, removeRoomType,
  updateRoomTypePrice } = require('../handlers/roomtypesHandler');
// Rooms
  const {getRooms, insertRoom,getRoomsAdmin,deleteRoom} = require('../handlers/roomHandler');
// Token
const {verifyToken,verifyAdmin} = require('../middlewares/auth');
// Employee
const {signupEmployee,
  loginEmployee} = require('../handlers/employeeHandler');
// Booking
const {getBookings,
  getBookingByRoomId,
  insertBooking,getPrivateBooking} = require('../handlers/bookingHandler');
const { getRoleType, createRole } = require('../handlers/roleHandler');


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
router.get('/roomsavailable', verifyAdmin,getRoomsAdmin);
router.delete('/room', verifyAdmin,deleteRoom);

//Read All Booking, ITS TOP SECRET!
router.get('/bookings',getBookings);

router.get('/bookings/:RoomId',getBookingByRoomId);

//get full list of booking, only for admin
router.get('/admin/bookings',verifyAdmin,getPrivateBooking)

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

//Role
router.get('/roles',getRoleType);
router.post('/role',verifyToken,createRole);

//Employee
router.post('/signup',signupEmployee);
router.post('/signin',loginEmployee);

//file
const upload = require('../middlewares/upload');
const { uploadFile } = require('../handlers/uploadHandler');
router.post('/upload',verifyToken, upload.single('file'), uploadFile);

router.use('*',(req,res)=>{
  res.status(404).json({
    message:'Wrong endpoint'
  })
});

module.exports=router;