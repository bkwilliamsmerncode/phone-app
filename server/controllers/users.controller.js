const Users = require("../models/users.model");

module.exports = {
    index: (req, res) => {
        console.log('get user route', req.params.username)
        Users.findOne({ name: req.params.username })
            .then(data => res.json({ results: data }))
            .catch(err => res.json({ message: 'Index went wrong... ', error: err }));
    },
    show: (req, res) => {
        Users.find()
            .where("_id")
            .ne(req.params.id)
            .exec()
            .then(data => res.json({ results: data }))
            .catch(err => res.json({ message: 'Show went wrong... ', error: err }));
    },


    create: (req, res) => {
        console.log('Create User', req.body)
        Users.create(req.body)
            .then(data => res.json({ results: data }))
            .catch(err => res.json({ message: 'Create went wrong... ', error: err }));
    },


    edit: (req, res) => {
        Users.findByIdAndUpdate({ _id: req.params.id }, req.body, { useFindAndModify: true, runValidators: true, new: true })
            .then(updatedUser => {
                res.json({ results: updatedUser })
            })
            .catch(err => res.json({ error: err }))
    },
    update: (req, res) => {
        Users.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true, runValidators: true })
            .then(data => res.json({ results: data }))
            .catch(err => res.json({ message: 'Update went wrong... ', error: err }));
    },
    delete: (req, res) => {
        Users.deleteOne({ _id: req.params._id })
            .then(data => res.json({ results: data }))
            .catch(err => res.json({ message: 'Delete went wrong... ', error: err }));
    },
    messages: (req, res) => {
        Users.findById(req.params.id)
            .then(found => res.json(found))
    },
    getAvi: (req, res) => {
        Users.findById(req.params.id)
            .then(user => {
                let payload = { _id: user._id, image: user.image[0] }
                res.json(payload)
            })
            .catch(err => res.json({ error: err }))
    }

}
