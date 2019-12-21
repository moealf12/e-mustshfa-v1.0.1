const express=require('express')
const app=express()
const cors=require('cors')
const bodyParser = require('body-parser');
const mongoose=require('mongoose')
const path = require("path");

app.use(cors())


app.use('/user',require('./routes/user'))

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const PORT =  process.env.PORT || 5000







mongoose.connect('mongodb+srv://moe:Aa7788000@moe-pxfnp.gcp.mongodb.net/test?retryWrites=true&w=majority'
,{ useUnifiedTopology: true },
()=>{
  console.log('Server is up')
})


app.use(express.json())
app.use(express.urlencoded({extended:false}))













app.listen(PORT,()=>console.log(`app is up on PORT ${PORT}`));
