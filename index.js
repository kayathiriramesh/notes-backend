const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const bcrypt = require ("bcrypt");
app.use(express.json());
const cors=require("cors");
app.use(cors());
const dbConnection = require('./db')

app.use('/notes/', require('./Routes/NoteRoutes'))
app.use('/users/', require('./Routes/UserRoutes'))



app.listen(8000,() =>{
    console.log("Server running on port :8000")
}
)

