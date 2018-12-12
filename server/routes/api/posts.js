const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get
router.get('/', async (req, res) => {
    const posts = await getPostsColl();
    res.send(await posts.find({}).toArray());
});



//Add

router.post('/', async (req, res) => {
    const posts = await getPostsColl();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
});



//Delete
router.delete('/:id', async (req, res) => {
    const posts = await getPostsColl();
    await posts.deleteOne({
        _id: new mongodb.ObjectID(req.params.id)
    })
    res.status(200).send();
});



async function getPostsColl() {
    const user = await mongodb.MongoClient.connect('mongodb://bufflog123:bufflog123@ds131954.mlab.com:31954/vue_bufflog', {
        useNewUrlParser: true
    });

    return user.db('vue_bufflog').collection('posts');
}


module.exports = router;