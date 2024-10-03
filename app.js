const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const dotenv = require("dotenv")
const app = express()
const con = require("./utils/db")

// configs
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
dotenv.config()

// main code
con()

// routes imports
// const accountRoute = require("./routes/accountRoute");
const activityRoute = require("./routes/activitiesRoute")
const collectorRoute = require("./routes/collectorRoute")
const paymentRoute = require("./routes/paymentRoute")
const requestRoute = require("./routes/requestRoute")
const userRoute = require("./routes/userRoute")
const accountRoute = require("./routes/accountRoute")

app.get("/", (req, res) => {
  res.json({ msg: "Welcome to credit union api" })
})

// api
app.use("/api/v1/users", userRoute)
app.use("/api/v1/collectors", collectorRoute)
app.use("/api/v1/activities", activityRoute)
app.use("/api/v1/requests", requestRoute)
app.use("/api/v1/payments", paymentRoute)
app.use("/api/v1/accounts", accountRoute)

port = process.env.port
app.listen(port, () => console.log(`listening on port ${port}`))
