
const { response } = require("express");
const Spin =require("../models/spinWheelSchema")
const cron = require('node-cron');
exports.isSpinned =  async(req,res)=>{

            const user = req.query.id;

            if(!user)
            {
                res.status(200).send("User not found");
                return;
            }
            

             const stat =await Spin.findOne({userId:user});

            // res.send(stat);
            // return;


            if(!stat)
            {
                Spin.create({userId:user})
                .then((r)=>
                {
                        res.send(true)
                    })
                    .catch((E)=>{
                        console.log(E);
                        res.send("err");
                    })

                    return;
            }

            if(stat.isSpinned)
            {
                res.json({message:"already spinned",stat:true});
                return;
            }



           
         const re =   await Spin.updateOne({userId:user},{$set:{isSpinned:true}});
         if(re)
         {
            res.send(true);
         }            
         else{
            res.send(err);
         }
            

            

      
        }



 exports.setSpin = async(req,res)=>{
            const user = req.query.id;

            if(!user)
            {
                res.status(404).send("User not found");
                return;
            }
            // const stat =await Spin.findOne({userId:user});

            // res.send(stat);
            // return;



         const re =   await Spin.updateOne({userId:user},{$set:{isSpinned:false}});
         if(re)
         {
            res.send(false);
         }            
         else{
            res.send(err);
         }
            

        }

        cron.schedule('0 0 * * *', async() => {
            const re =   await Spin.updateMeny({},{$set:{isSpinned:false}});
            if(re)
            {
               res.send(false);
            }            
            else{
               res.send(err);
            }
          });