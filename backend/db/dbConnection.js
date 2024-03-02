const mongoose = require('mongoose');
const connectDB = async() => {
    try{
        await mongoose.connect('mongodb+srv://SushmithaGudapati:Sushmitha2293@cluster0.p3rl1je.mongodb.net/db?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');
    }
    catch(error){
        console.log(error);
    }
}

module.exports = connectDB;