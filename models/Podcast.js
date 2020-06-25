const mongoose = require('mongoose');

// Schema 
const Schema = mongoose.Schema;

const podcastSchema = new Schema({
    title: String,
    description: String,
    date: {
        type: String,
        default: Date.now()
    }
});

// Model 
const PodcastModel = mongoose.model('PodcastModel', podcastSchema);

module.exports = PodcastModel;
