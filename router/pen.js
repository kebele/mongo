//ÇOKLU KAYIT 

const router = require("express").Router();
const mongoose = require("mongoose");
const Pen = require("../models/penX");

router.post("/penroute", async (req,res)=>{
    try{
        //çoklu kayıt için try a bir if ekleyeceğiz
        // allData diye bir array varsa farklı bir işlem yapacak yoksa normal devam edecek
        if(req.body.allData){
            Pen.insertMany(req.body.allData, function(err){
                if(err){
                    res.send(err)
                }else{
                    res.json({
                        success : true,
                        multiplePen : req.body.allData,
                        message : "multiple pen saved..."
                    })
                }
            })
        } else {
        let pen = new Pen();
        pen._id = new mongoose.Types.ObjectId();
        pen.modelName = req.body.modelName; 
        pen.modelYear = req.body.modelYear;
        pen.userById = req.body.userById;
        
        await pen.save(function(error){
            if(!error){
                Pen.find({})
                    .populate('userById')
                    .exec(function(error, user){
                        //sadece id sini yolladığımız ile ilgli bütün bilgileri getirsin
                        console.log(JSON.stringify(user,null, "\t"))
                    })                
            }
        });

        res.json({
            success : true,
            savedPen : pen,
            message : "pen saved..."
        })
        }
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
})


//GET İLE VAR OLAN VERİYİ MONGO'DAN ÇEKMEK

router.get("/penroute/:id", async (req,res) => {
    //:id dememizin sebebi ne gelirse almayı kabul ediyoruz
    try {
        let pen = await Pen.findById({_id : req.params.id});

        res.json({
            success : true,
            foundPen : pen,
            message : "pen found..."
        })
    }catch (error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
})

//DELETE METODU

router.delete("/penroute/:id", async (req,res) => {
    //:id dememizin sebebi ne gelirse almayı kabul ediyoruz
    try {
        let pen = await Pen.findByIdAndDelete({_id : req.params.id});

        res.json({
            success : true,
            deletedPen : pen,
            message : "pen deleted..."
        })
    }catch (error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
})

//PUT METODU, var olan kaydı güncelleyecek
//post ile aynı mantık

router.put("/penroute/:id", async (req,res)=>{
    try{
        let pen = await Pen.findByIdAndUpdate({_id : req.params.id},{
            $set : {
                modelName : req.body.modelName, 
                modelYear : req.body.modelYear,
            }
        });
        // },{upsert : true}); bu şekilde yaparsak eğer update et dediğimiz yerde böyle bir kayıt yoksa bunu kaydeder.
        
        res.json({
            success : true,
            updatedPen : pen,
            message : "pen updated..."
        })
    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
})

// ÇOKLU GET YAPALIM

router.get("/pensroute/", async (req,res) => {
    //:id dememizin sebebi ne gelirse almayı kabul ediyoruz
    try {
        await Pen.find({},function(err,result){
            if(err){
                console.log(err)
            } else {
                res.json(result)
            }
        })

    }catch (error){
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
})

//bu router ı dışarıya export edelim ve app.js de import edip kullanalım
module.exports = router;