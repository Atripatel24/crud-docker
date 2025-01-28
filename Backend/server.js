const express = require('express');
const connectDB = require('./Database/db');
const cors = require('cors')
const route = require('./Database/Route/route')
const bodyParser = require('body-parser');

const port = 3000

const app = express();

app.use(cors());
app.use(express.json())
app.use(route);

// app.get('/form',(req,res)=>{
//     res.send('form connected');
// })

connectDB();

app.listen(port,()=>{
    console.log(`server  running on port ${port}`);
})