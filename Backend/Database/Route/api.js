const express = require('express');
const router = express.Router();

const User = require('../Model/form');

router.post('/form',async(req,res)=>{
    console.log(req.body)

    let user = new User()

    user.name = req.body.name,
    user.email = req.body.email,
    user.password = req.body.password,
    user.birthdate = req.body.birthdate,
    user.gender = req.body.gender
    user.subject = req.body.subject

    let data = await user.save();
    console.log('data of db',data);
    res.send(data)
})


router.get('/getdata',async(req,res)=>{
   let data = await User.find();
//    console.log('table',data)
   res.send(data)
})

router.put('/updateuser/:id' , async(req,res)=>{
   console.log('update',req.params.id);
   let user = {
      name : req.body.name ,
      email : req.body.email ,
      password : req.body.password ,
      birthdate : req.body.birthdate,
      gender : req.body.gender,
      subject : req.body.subject

   }

   let data = await User.find({_id : req.params.id}).updateOne({
      $set: user
   })
   res.send(data)
})

router.delete('/deleteuser/:id', async(req,res)=>{
   console.log('delete',req.params.id);

   let data = await User.deleteOne({_id:req.params.id})

   res.send(data)
})

// check mail 

router.get('/getemail/:email', async(req,res)=>{
   console.log(req.params.email)
   
   let email = await User.findOne({email : req.params.email});

   if(email){
      res.send({exist:true})
   }else{
      res.send({exist:false})
   }

})

module.exports = router 