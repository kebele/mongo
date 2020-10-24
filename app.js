// express ekleyelim
const express = require("express");
// Using Node.js `require()`
const mongoose = require('mongoose');
// morgan 
const morgan = require("morgan");
// body-parser
const bodyParser = require("body-parser")
// dotenv yi entegre edelim
const dotenv = require("dotenv").config();
// router > pen.js i buraya import edelim,
 
// kullanmasını istediğimiz dosyanın adresini verdik
const penRoutes = require("./router/pen")
const userRoutes = require("./router/user")



// app a ekleyelim
const app = express();

app.use(morgan("dev")); //development ortamında old. için bunu yazdık, diğer alternatiflerde var
app.use(bodyParser.json()); // verilerimizi json formatında kullanacağımız için böyle yaptık

// penRoutes i api adres inden sonra kullansın
app.use("/api", penRoutes)
app.use("/api", userRoutes)


//mongo ya bağlanma, async yapı kullamayacağımız için başına await eklemedik, kodun orjinalinde await var
// mongoose.connect('mongodb+srv://kebele:burus110@cluster0.pqbtn.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    //yoruma almamız sebebi buradaki adresi .env de kullanacağımız için aldım, bunu yapmamızın sebebi burada bizim kullanıcı adı ve şifremizin görünmemesi için, .env dosyaları build edilmez, görünmez
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, err =>{
    if(err){
        console.log("err")
    } else{
        console.log("connected to mongoDB...")
    }
});

app.listen(3000, function(){
    console.log("port listens ...")
});

