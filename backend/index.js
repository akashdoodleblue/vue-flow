const express = require('express')
const cors = require("cors");
require('./db/mongoose')
const userRouter = require('./api/routers/user')
const screenRouter = require('./api/routers/screen')

const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(express.json())
app.use("/user", userRouter);
app.use("/screen", screenRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})