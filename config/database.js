const mongoose = require('mongoose');

// 데이터베이스 연결 
const dbAdress = "mongodb+srv://admin:tmdduf23@cluster0.gv7zv.mongodb.net/shoppingmall?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose
    .connect(dbAdress, options)
    .then(() => console.log("mongoDB connected ..."))
    .catch(err => console.log(err.message));