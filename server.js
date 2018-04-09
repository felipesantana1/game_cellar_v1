const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
// const multer = require("multer");
// const upload = multer({dest:"public/src/assets/uploads/"});
const app = express();

app.use(express.static(path.join(__dirname, "./public/dist")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

app.listen(8888, function(){
    console.log("listening on port 8888");
});