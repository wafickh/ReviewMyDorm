
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');


const schoolRoutes = require('./routes/schools.js')
const dormRoutes = require('./routes/dorms.js')
const reviewRoutes = require('./routes/reviews.js')
const userRoutes = require('./routes/users.js')
const app = express();

app.use(cors());


app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));
//mongodb://127.0.0.1:27017/DormCritique
const db_url = process.env.DB_URL;
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use('/api/schools', schoolRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/api/dorms', dormRoutes);
app.use('/api/users', userRoutes);



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


app.listen(5000, () => {
    console.log('Serving on port 5000')
})