import express from "express";
import mongoose from "mongoose";
import connectDB from "./db.js";
mongoose.set("strictQuery", false);
connectDB();
const app=express();
const AddressSchema = mongoose.Schema({
    houseNumber: {
        type:String,
    },
    street: {
        type:String,

    },
    city: {
        type:String,

    },
    State:{
        type:String,
    },
    Pincode:{
        type:String
    }
  });
const profileSchema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    RollNo:{
        type:String,
        required:true
    },
    ContactNo:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    BloodGroup:{
        type:String,
        required:true
    },
    FatherName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Address:{
        type:AddressSchema,
        required:true
    }

})
var Profile = mongoose.model('Profile',profileSchema);
profileSchema.plugin(Profile);
const profile=[{
    Name     :"Joys",
    RollNo   :"610818106010",
    ContactNo:"9448983789",
    class    :"8th",
    section  :"A",
    BloodGroup:"B+",
    FatherName:"Arron",
    Email     :"abc@gmail.com",
    Address   :{
        houseNumber:"G-36",
        street: "1st cross",
        city:"Chennai",
        State:"TamilNadu",
        Pincode:"5600035"
     }

},
{
     Name     :"Aswini",
     RollNo   :"610818106010",
     ContactNo:"9448983789",
     class    :"8th",
     section  :"A",
     BloodGroup:"B+",
    FatherName:"Arron",
    Email     :"abc@gmail.com",
    Address   :{
          houseNumber:"G-36",
          street: "1st cross",
          city:"Chennai",
          State:"TamilNadu",
          Pincode:"5600035"
 }

}]
app.use(express.json());
app.get("/api/profile",(req,res)=>{
    try{
        res.status(200).send(profile);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
app.get("/api/profile/:id",(req,res)=>{
  console.log(req.params.id);
  Profile.findById(req.params.id)
  
  .then(result=>{
      res.status(200).json({
          profile:result
      })
  })
  .catch(err=> {
  console.log(err);
  res.status(505).json({
      error:err
  })
  }
)
})
//post
app.post("/api/profile/post",async(req,res)=>{
    try{
      const profile={
        Name     :req.body.Name,
        RollNo   :req.body.RollNo,
        ContactNo:req.body.ContactNo,
        class    :req.body.class,
        section  :req.body.section,
        BloodGroup:req.body.BloodGroup,
        FatherName:req.body.FatherName,
        Email     :req.body.Email,
        Address   :req.body.Address
      }
      console.log(profile);
      const menu=new Profile(profile);
      const profileCreated=await menu.save();
      if(profileCreated){
        console.log("Created");
        res.status(201).json({message:"Profile available"});
    }else
    {
        res.status(401);
        throw new Error("not available");
    }
  } catch (err){
          return res.status(500).json({message: err.message});
        }});
 //update
app.put('/api/profile/:id',(req,res)=>{
  console.log(req.params.id);
  Profile.findOneAndUpdate({_id:req.params.id},{
      $set:{
        Name     :req.body.Name,
        RollNo   :req.body.RollNo,
        ContactNo:req.body.ContactNo,
        class    :req.body.class,
        section  :req.body.section,
        BloodGroup:req.body.BloodGroup,
        FatherName:req.body.FatherName,
        Email     :req.body.Email,
        Address   :req.body.Address
      }
  })
  .then(result=>{
      res.status(200).json({
          updated_profileDetails:result       
       })
  })
  .catch(err=>{
      console.log(err)
      res.status(500).json({
          error:err
      })
  })
  })      
       
  //delete
  app.delete('/api/profile/:id',(req,res)=>{
    console.log(req.params.id);
    Profile.findByIdAndRemove({_id:req.params.id},{
        $set:{
          Name     :req.body.Name,
          RollNo   :req.body.RollNo,
          ContactNo:req.body.ContactNo,
          class    :req.body.class,
          section  :req.body.section,
          BloodGroup:req.body.BloodGroup,
          FatherName:req.body.FatherName,
          Email     :req.body.Email,
          Address   :req.body.Address
        }
    })
    .then(result=>{
        res.status(200).json({
            Deleted_profileDetails:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    app.delete("/api/profile",(req,res)=>{
    
      Profile.deleteMany({profile},(err,result)=>{
      if(err) throw err
      res.send(profile)
      })
  })  
const port=5000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    console.log(profile);
});