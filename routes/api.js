const express = require('express');
const router = express.Router();
const PodcastModel = require('../models/Podcast');

router.get('/', (req, res) => {
    
    
    PodcastModel.find({  })
    .then((data) => {
        // console.log(`Data: ${data}`)
        res.json(data);
    })
    .catch((error) => {
        console.log('Error finding data', error)
        })
});

router.post('/save', (req, res) => {
    console.log('Body: ' + req.body);
    const data = req.body

    const newPodcast = new PodcastModel(data);

    newPodcast.save(error => {
        if(error) {
            res.status(500).json({ msg: "Sorry your file could not be saved" });
        } else {
            res.json({ mgs: "Your data has been saved!!!!" })
        }
    })

});

// router.get("/name", (req, res) => {
//     const data = {
//         username: 'gbadamosi',
//         age: 14
//     };
//     res.json(data);
// });



module.exports = router;