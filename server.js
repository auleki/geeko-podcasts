const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); 
const cors = require('cors');
const path = require('path');

const app = express(); 
const PORT = process.env.PORT || 8000;

const apiRoutes = require('./routes/api');

const url = 'mongodb+srv://admin:admin12345@mern-deploy-02fwd.mongodb.net/test?retryWrites=true&w=majority'
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// const PodcastModel = require('./models/Podcast');

mongoose.connect(url, options )


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// HTTP request logger 
app.use(cors());
app.use(morgan('tiny'));
app.use('/api', apiRoutes);


app.listen(PORT, console.log(`Server is starting at ${PORT}`));