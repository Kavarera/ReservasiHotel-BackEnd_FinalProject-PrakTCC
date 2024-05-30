const { nanoid } = require('nanoid');
const Booking = require('../models/booking');
const Customer = require('../models/customer');
const {sequelize} = require('../utils/connection');

const getBookings = async (req,res)=>{
    try{
        
        const booking = await Booking.findAll({
            attributes:['checkin','days']
        });
        res.status(200).json({
            length: booking.length,
            data: booking.length<=0?null:booking
        })
    }catch(e){
        res.status(400).json({
            status:'Failed',
            message: `Error : ${e.message}`
        })
    }
}

const getBookingByRoomId = async(req,res)=>{
    try{
        const booking = await Booking.findAll({
            where:{
                RoomId: req.params.RoomId
            },
            attributes:['checkin','days']
        });
        res.status(200).json({
            length: booking.length,
            data: booking.length <=0 ? null : booking
        })
    }catch(e){
        res.status(400).json({
            status: 'Failed',
            message: `Error : ${e.message}`
        })
    }
}

const insertBooking = async (req,res)=>{
    try{
        //search customer then create customer first if not exist
        const {nik,fullname,phone,email,checkin,days,RoomId} = req.body;
        const [customer,created] = await Customer.findOrCreate({
            where:{
                nik:nik
            },
            defaults:{
                nik,fullname,phone,email
            }
        });
        const kb = nanoid(16);
        const b = await Booking.create({
            kode_booking: kb,
            checkin: checkin,
            days:days,
            RoomId: RoomId,
            CustomerId: customer.id
        });
        res.status(200).json({
            status:'Success',
            data:{
                booking:b,
                customer : customer 
            }
        })
    }catch(e){
        res.status(400).json({
            status:'Failed',
            message:`Error : ${e.message}`
        })
    }
}

const getPrivateBooking = async(req,res)=>{
    try{
        const booking = await Booking.findAll({
            attributes:['kode_booking',
            [sequelize.fn('DATE_FORMAT', sequelize.col('checkin'), '%m-%d-%Y %H:%i'),
             'checkin'],'days','RoomId','CustomerId']
        });
        res.status(200).json({
            length: booking.length,
            data: booking.length <=0 ? null : booking
        })
    }catch(e){
        res.status(400).json({
            status: 'Failed',
            message: `Error : ${e.message}`
        })
    }
}

module.exports = {getBookings,getBookingByRoomId,insertBooking,getPrivateBooking}