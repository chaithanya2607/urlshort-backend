require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./DB/connectDB')
//custom imports

const authRouter = require('./Routes/auth')
const privateRoute = require('./Routes/private')

const app = express();
const PORT = process.env.PORT || 4001;

connectDB();
/* middleware */

app.use(cors())
app.use(express.json());

app.get('/',(req,res)=>{
  res.send('Url shortner server is running')
})

app.use('/api/auth',authRouter)
app.use('/api/private',privateRoute)
app.use('/',privateRoute)


const server = app.listen(PORT, () => console.log(`Server running in the port ${PORT}`));


/* use Process to handle Exception */
process.on('unhandledRejection',(error)=>{
    console.log(error);
    server.close(()=> process.exit(1));
})


