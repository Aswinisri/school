import express from "express";
import connectDB from "./db.js";
import mongoose from "mongoose";
const app=express();
connectDB();
mongoose.set("strictQuery", false);
const subjectSchema=mongoose.Schema([
    {
        subjectName:{
            type:String,
            // required:true
                 },
        subjectTeacher:{
            type:String,
            // required:true
                },
        schedule:[
            {
                testOrTask   :{
                    type:String,
                    // required:true
                },
                Unit:{
                    type:String,
                    // required:true
                },
                Date     :{
                        type:String,
                        // required:true
                    },
                Mark         : {
                        type:String,
                        // required:true
                    },
                Result       : {
                        type:String,
                        // required:true
                    }
            }]
        
    }]
)

const Subject=mongoose.model("Subject",subjectSchema);
subjectSchema.plugin(Subject);

const subject=[
     {
       subjectName   : "Tamil",
       subjectTeacher: "Mr.Damodaran",
       schedule:[{
                testOrTask:"completed test",
                Unit    :"2",
                Date    : "02-06-2022",
                Mark    : "60/100",
                Result  : "Pass",
            },
            {
                testOrTask:"upcomming test",
                Unit    :"2",
                Date    : "02-06-2022",
                Mark    : "60/100",
                Result  : "Pass",                    
            },
            {
                testOrTask:"completed task",
                Unit    :"2",
                Date    : "02-06-2022",
                Mark    : "60/100",
                Result  : "Pass",
            },
            {
                testOrTask:"upcomming task",
                Unit    :"2",
                Date    : "02-06-2022",
                Mark    : "60/100",
                Result  : "Pass",          
            },
       ]
       
    },
    {
        subjectName   : "English",
        subjectTeacher: "Mr.Damodaran",
        schedule:[{
                 testOrTask:"completed test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",                    
             },
             {
                 testOrTask:"completed task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",          
             },
        ]
        
     },
     {
        subjectName   : "Maths",
        subjectTeacher: "Mr.Damodaran",
        schedule:[{
                 testOrTask:"completed test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",                    
             },
             {
                 testOrTask:"completed task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",          
             },
        ]
        
     },
     {
        subjectName   : "Science",
        subjectTeacher: "Mr.Damodaran",
        schedule:[{
                 testOrTask:"completed test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",                    
             },
             {
                 testOrTask:"completed task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",          
             },
        ]
        
     },
     {
        subjectName   : "Social",
        subjectTeacher: "Mr.Damodaran",
        schedule:[{
                 testOrTask:"completed test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming test",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",                    
             },
             {
                 testOrTask:"completed task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",
             },
             {
                 testOrTask:"upcomming task",
                 Unit    :"2",
                 Date    : "02-06-2022",
                 Mark    : "60/100",
                 Result  : "Pass",          
             },
        ]
        
     },
]
//all data
app.use(express.json());
app.get("/api/subject",(req,res)=>{
    try{
        res.status(200).send(subject);
    }catch(error)
    {
        res.json({message:"unable to create"});

    }

});
// specific data
app.get("/api/subject/:id",(req,res)=>{
    console.log(req.params.id);
    Subject.findById(req.params.id)
    
    .then(result=>{
        res.status(200).json({
            subject:result
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
app.post("/api/subject",async(req,res)=>{
    try{
        const details= 
                {
                   subjectName  : req.body.subjectName,
                   subjectTeacher: req.body.subjectTeacher,
                   schedule:req.body.schedule
               }
               
            
console.log(details);
 const subject=new Subject(details);
const subjectCreated=await subject.save();
if(subjectCreated){
    console.log("created");
res.status(201).json({message:"successfully created"});
}
else{
    res.status(401);
    throw new error("not found ");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
//update
app.put('/api/subject/:id',(req,res)=>{
    console.log(req.params.id);
    Subject.findOneAndUpdate({_id:req.params.id},{
        $set:{
        
            
                subjectName  : req.body.subjectName,
                subjectTeacher: req.body.subjectTeacher,
                schedule:req.body.schedule
            
            
                  
                   
                }
            
            })
            .then(result=>{
                res.status(200).json({
                    updated_subject:result       
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
    app.delete('/api/subject/:id',(req,res)=>{
        console.log(req.params.id);
        Subject.findByIdAndRemove({_id:req.params.id},{
            $set:{
               
                
                    subjectName  : req.body.subjectName,
                    subjectTeacher: req.body.subjectTeacher,
                    schedule:req.body.schedule
                
                
            }
        })
        .then(result=>{
            res.status(200).json({
                Deleted_subjectDetails:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
 app.delete("/api/subject",(req,res)=>{
    
            Subject.deleteMany({subject},(err,result)=>{
            if(err) throw err
            res.send(subject)
            })
        })

//  export default subject.js;       
const port=5000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    console.log(subject);
});
