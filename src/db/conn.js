const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0/RegForm").then(() =>{
    console.log(`Connection success`);
}).catch(()=> {
    console.log(`Error connecting to  db`);
});