const { Op } = require('sequelize');
const Role = require('../models/role');
const getRoleType = async(req,res)=>{
    console.log(__dirname);
    console.log(__dirname);
    console.log(__dirname);
    console.log(__dirname);
    try{
        const roles = await Role.findAll(({
            where:{
                id:{
                    [Op.ne]: 1
                }
            }
        }));
        res.status(200).json({
            length: roles.length,
            data:roles
        })
    }catch(e){
        res.status(400).json({
            status:'Failed',
            message:`Error : ${e.message}`
        })
    }
}

    const createRole=async(req,res)=>{
        try{
            const{roleName} = await req.body;
            const [role,created] = await Role.findOrCreate({
                where:{name:roleName},
                defaults:{name:roleName}
            });
            if(!created){
                throw new Error('Role is already Exist');
            }
            res.status(200).json({
                data:role
            })
        }catch(e){
            res.status(400).json({
                status:'Failed',
                message:`Error : ${e.message}`
            })
        }
    }

module.exports={createRole,getRoleType}