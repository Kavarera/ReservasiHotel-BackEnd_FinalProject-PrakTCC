const { nanoid } = require('nanoid');
const Booking = require('../models/booking');
const Customer = require('../models/customer');


const getBookings = async (req,res)=>{
    try{
        console.log(req.employee.RoleId);
        if(req.employee.RoleId !== 1){
            return res.sendStatus(403);
        }
        const booking = await Booking.findAll();
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
        if(req.employee.RoleId !== 1){
            return res.sendStatus(403);
        }
        const booking = await Booking.findAll({
            where:{
                RoomId: req.params.RoomId
            }
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
        const customer = await Customer.findOrCreate({
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

    }


}

module.exports = {getBookings,getBookingByRoomId,insertBooking}