const express = require("express");
const cors = require("cors");
const dbconnection = require("./connection/connect");
const router = require("./routes/auth.routes");
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to personal application." });
});

app.use("/setup", router);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
module.exports = app;