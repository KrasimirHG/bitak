const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const config = require('config');
const cors = require('cors');

// body-parser middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, 'uploads')));

app.use(cors());

// db config

// const db = config.get("mongoURI");
// const db = "mongodb://127.0.0.1:27017/MulterBulter";

const db = config.get('mongoURI');
// const db = "mongodb+srv://Krasio:Krasimir@cluster0.wpip2.mongodb.net/MulterBulter?retryWrites=true&w=majority"

// connect to mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connect to mongo'))
    .catch((err) => console.log(err));

// use routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/users/verifyOtp', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static asserts if inproduction
if (process.env.NODE_ENV === 'production') {
    // Set stattic folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server lissten on port ${port}`));
