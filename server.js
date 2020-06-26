const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); 
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express(); 
const PORT = process.env.PORT || 8000;

const apiRoutes = require('./routes/api');


// const url = 'mongodb+srv://admin:admin12345@mern-deploy-02fwd.mongodb.net/test?retryWrites=true&w=majority'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// const PodcastModel = require('./models/Podcast');

mongoose.connect(process.env.MONGODB_URI, options )

// shontan lagbaja
// fuck the society
// prefix
// Ellen Johnson Sirleaf 2006
// women are not sidelined
// they are not looked down upon
// there are MRS who take pride in their name
// society is not governed by men


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'));
}

// HTTP request logger 
app.use(cors());
app.use(morgan('tiny'));
app.use('/api', apiRoutes);


app.listen(PORT, console.log(`Server is starting at ${PORT}`));
