const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const bcrypt = require('bcrypt');

const signupEmployee = async(req,res)=>{
    try{
        const {fullname,username,password,RoleId}=req.body;
        hashed = await bcrypt.hash(password,5);
        console.log(hashed);
        await Employee.create({
            fullname,username,password : hashed,RoleId
        });
        res.status(201).json({
            status: 'Success'
        })
    }catch(e){
        res.status(400).json({
            status:`Failed`,
            message:`Error : ${e.message}`
        })
    }
}

const loginEmployee = async (req,res)=>{
    try{
        const {username,password} = req.body;
        const emp = await Employee.findOne({
            where: {
                username: username
            }
        });
        if(emp==undefined){
            throw new Error('Invalid Email or Password!');
        }
        const verifyPass = await bcrypt.compare(password,emp.password);
        if(!verifyPass){
            throw new Error('Invalid Email or Password!');
        }
        //buat token
        const token = jwt.sign({
            roleId: emp.RoleId,
            employeeId: emp.id
        },process.env.ACCESS_TOKEN_SECRET,{
            algorithm: "HS256",
            expiresIn: "365d"
        });
        res.status(200).json({
            status: 'Success',
            message : 'Login Successfully',
            token: token
        });
    }catch(e){
        res.status(400).json({
            status: 'Failed',
            message: `Error : ${e.message}`
        })
    }
}

module.exports = {signupEmployee,loginEmployee};