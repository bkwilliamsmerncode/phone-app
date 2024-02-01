const MessagesController = require('../controllers/messages.controller');


module.exports = (app) => {
app.post("/api/createMessage", MessagesController.create);
app.get("/api/show/", MessagesController.show);
app.get("/api/showMsg/:room", MessagesController.showMsg);
app.get("/api/getLastMsg/:room", MessagesController.getLastMsg);
app.get('/api/getMessage/:id', MessagesController.getLastMessage)
}