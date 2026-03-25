const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
const AuthRoute = require('./routes/auth')
const orderRoute = require('./routes/Order')

const accountRoute = require('./routes/account')
const cors = require("cors");

dotenv.config()


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/account.html');
});

app.get('/Home.html', (req, res) => {
    res.sendFile(__dirname + '/Home.html');
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose.connect(process.env.Mongo_url)
.then(()=>
console.log('Db connected suceessfully'))
.catch((err) => console.log(err))


app.use(cors())
app.use(express.json())
app.use('/api/users', userRoute)
app.use('/api/auth', AuthRoute)
app.use('/api/orders', orderRoute)
app.use('/api/account', accountRoute)

 
const PORT = process.env.PORT || 9000
app.listen(PORT , () =>
console.log(`Backend is running at ${PORT}`)
)