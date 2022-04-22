const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');
const port = 4000;
const UserRoutes = require('./Routes/user')
const PostRoutes = require('./Routes/post')
const server = express()

server.use(bodyparser.json());
server.use(cors());
//img
server.use("/uploads/images", express.static(path.join("uploads", "images")));

server.get('/', (req, res)=>{
    res.send("Hello Farfour!");
})

server.use('/user', UserRoutes);
server.use('/post', PostRoutes);


mongoose.connect("mongodb+srv://admin:admin@projetisgb.zdzuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(result => {
    server.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
}).catch(error => {
    console.log(`server Error while trying to connect to DB ${error}`);
})

