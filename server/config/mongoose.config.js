require("dotenv").config()
const mongoose = require("mongoose")
const db = "capstone"

mongoose.connect(process.env.URI + db,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`...Established connection with db - ${db}...`))
    .catch(err => console.error("Error: ", err))