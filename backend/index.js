// index.js
console.log("Hej fra Node.js!");

const express = require("express");
const app = express();
const routes = require("./routes");

app.use(express.json());

// Load routes
routes(app);

app.listen(3000, () => console.log("Backend running on port 3000"));
