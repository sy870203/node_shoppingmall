const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}

mongoose
    .connect(process.env.MONGO_URI, options)
    .then(() => console.log("mongoDB connected ..."))
    .catch(err => console.log(err.message));