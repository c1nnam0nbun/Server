//Useful imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json({extended: true}))

//Connect to MongoDB
const uri = process.env.DB_URI
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.once('open', () => console.log('MongoDB connected succesfully...'))

//Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/lot', require('./routes/lots.routes'))

//Run server
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))

const startKeepAlive = () => {
    setInterval(() => {
        let options = {
            host: 'weather-stats.herokuapp.com',
            port: 80,
            path: '/'
        };
        http.get(options, res => {
            res.on('data', chunk => {
                try {
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', err => {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000); // load every 20 minutes
}

startKeepAlive();
