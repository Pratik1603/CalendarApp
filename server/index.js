const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
import path from 'path';
dotenv.config();
const app = express();
const __dirname=path.resolve();

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true); 
    },
    credentials: true 
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

// Routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const notRoutes=require("./routes/notification")
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notRoutes);


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static(path.join(__dirname,'client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})