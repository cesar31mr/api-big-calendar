const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const body_parser = require('body-parser');

const date_route = require('./routes/date_route');
const user_route = require('./routes/user_route');

const origenes = process.env.ORIGENES;
const mongodb = process.env.MONGODB;
const calendarport = process.env.CALENDARPORT;

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: origenes,
    }
});

app.use(cors());
app.get('/', (req, res) => {
    res.send('Welcome to the server');
});

io.on("connection", function(socket){
    socket.on("save-date", (new_date) => {
        io.emit("new-date", {calendar_date: new_date});
    });
});

mongoose.connect(mongodb).then(res => {
    server.listen(calendarport, () => {
        console.log(`Server running on port ${calendarport}`);
    })
}).catch(err => {
    console.log(err);
});

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));
app.use('/api', date_route);
app.use('/api', user_route);

module.exports = app;