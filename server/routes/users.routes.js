const UsersController = require('../controllers/users.controller');

module.exports = (app) => {

    app.get("/api/getuser/:username", UsersController.index);
    app.get("/api/getuser/messages/:id", UsersController.messages);
    app.get("/api/show/:id", UsersController.show);
    app.post("/api/createAccount", UsersController.create);
    app.put("/api/update/:_id", UsersController.update);
    app.delete("/api/delete/:_id", UsersController.delete);
    app.get("/api/avi/:id", UsersController.getAvi)
    app.put("/edit/:id", UsersController.edit)
}