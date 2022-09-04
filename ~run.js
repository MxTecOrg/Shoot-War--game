/* nodejs */
const express = require("express");
const server = express();

server.listen(8000, () => console.log("http://localhost:8000"));
server.use("/", express.static("/sdcard"));
