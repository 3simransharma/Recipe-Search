const express = require("express");
const app = express();
const env = require("dotenv");
const Food = require("./models/Food");

env.config();
app.use(express.json());

app.post("/add",async(req,res,next) => {
    try{
        // let tags = [];
        const data = await Food.create(req.body);

        res.status(201).json({
            success:true,
            data,
        });

    }catch(error){
        console.log(error);

    }
})

// app.get("/search/:key" , async(req,res,next)=>{
//     let data = await Food.find({
//         "$or":{
//                 "name":{$regex:req.params.key},
//                 "category":{$regex:req.params.key},
//         }
//     })
// })

app.get('/search/:key', async (req, res) => {
    const key = req.params.key;
  
    try {
      const results = await Food.find({
        $or: [
          { name: { $regex: key, $options: 'i' } },
          { category: { $regex: key, $options: 'i' } },
          { 'tags.name': { $regex: key, $options: 'i' } },
        ],
      });
  
      res.json(results);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

// app.get("/search/:key",async(req,res) => {
//     // const key = req.params.key;
//     const key = req.query.key;
//     console.log(req.query.key);
//     // console.log(req.params.key);

//     try{
//         const data = await Food.find({
//             "$or":[
//                 {"name":{$regex:key}},
//                 {"category":{$regex:key}},
//                 { 'tags.name': { $regex: key, $options: 'i' } },
//             ],
//         });

//         // res.json(data);
//         res.status(200).json({
//             success:true,
//             data
//         })
//     }
//     catch(error){
//         console.error(error);
//         res.status(500).json({
//             error:"Search Error",
//         });
//     }
// })

module.exports = app;