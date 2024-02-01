const Messages = require("../models/messages.model");
const Users = require("../models/users.model")

module.exports = {
    create: (req, res) => {
        console.log('message', req.body)
        Messages.create(req.body)
            .then(data => {


                // res.json({results: data})
            })
            .catch(err => res.json({ message: 'Create went wrong', error: err }));
    },

    show: (req, res) => {
        Messages.find()
            .populate({ path: "author", select: ["name"] })
            .then(data => res.json({ results: data }))
            .catch(err => res.json({ message: 'Show went wrong', error: err }));
    },
    saveMsg: (msg) => {
        console.log("Save Msg hit: ", msg)
    },


    showMsg: (req, res) => {

        Messages.find({ receiver: req.params.room })
            // .populate("messages")
            .populate({ path: "author", select: ["name"] })

            .exec()
            .then(messages => {
                res.json(messages)
            })
            .catch(err => console.log('get messages err', err))
    },



    getLastMsg: (req, res) => {
        Messages.find(reg.body.length)
        console.log("rbl", request.body.length)
    },
    getLastMessage: (req, res) => {
        console.log('get last message', req.params)
        Messages.findById(req.params.id)
            .then(found => res.json(found))
            .catch(err => console.log('find messages error', err))

    }








}