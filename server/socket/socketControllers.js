const Messages = require("../models/messages.model");
const Users = require("../models/users.model");

module.exports = {

    createMessage: (data, socket, io) => {


        let { room, author, authorId, message } = data

        let newMessage = {
            message,
            author: authorId,
            receiver: room,
            // isRead
        }
        Messages.create(newMessage)
            .then(res => {
                console.log(res)

                Users.findOneAndUpdate({ _id: res.author }, { $push: { "messages": res._id } }, { new: true })
                    .then(user => {
                        Messages.find({ receiver: res.receiver })
                            .populate({ path: "author", select: ["name"] })
                            .exec()
                            .then(messages => {
                                //  Array.from(messages).forEach((item) => {
                                //     let doc = item
                                //     doc.isRead = true
                                //     doc.save()
                                // })
                                console.log('messages', messages)
                                io.in(room).emit("room_messages", messages)
                            })
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.error(err))

        io.in(data.room).emit('recieve_message', data)

    },

    getRoomMessages: (data, socket, io) => {
        Messages.find({ receiver: data })
            .populate({ path: "author", select: ["name"] })
            .exec()
            .then(messages => {
                socket.emit("room_messages", messages)
            })
    }
}