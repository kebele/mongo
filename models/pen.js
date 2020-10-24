// mongoose u ekleyeceğiz
const mongoose = require('mongoose');
// oluşturacağımız schema nın adı ne
const pen = new mongoose.Schema({
    //yeni bir schema oluştur
    _id : mongoose.ObjectId,
    //id mongoose kendisi verir
    modelName : String,
    //biz yollayacağız
    modelYear : Number,
    //biz yollayacağız
    userById : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

//pen adını verdiğimiz bir schema yaptık, içinde mongo nun otomatik verdiği bir id var, bizim belirlediğimiz bir modelName ve modelYear olacak ve bu dosyayı app.js den ulaşabilmek için export edeceğiz, 

module.exports = mongoose.model("pen", pen);
// bunu kullanacağımız yerde import ederken kullanacağımız isim "pen" olsun, ve oluşturduğumuz schema nın adı pen, aynı isim yani

// pen schemasını pen ismi ile export ediyoruz

//buna app.js den ulaşmak için yaptık ancak app.js den direk ulaşmaya ayarlasak app.js çok karışabilir, yeni bir klasör router > pen.js yaptık, yani models deki isimle aynı ismi verdik, açıklama devam router > pen.js de... 
