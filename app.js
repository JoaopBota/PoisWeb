const express = require('express');
const app = express();
const cors = require('cors');
const pointsofinterestRouter = require('./routes/pointsofinterest')
const loginRouter = require('./routes/login');
const bodyparser = require('body-parser');
const con = require('./connection');
const Middleware = require('./middleware');
const cookieParser = require('cookie-parser');
const session = require('express-session');
app.listen(3000, () => console.log('Express server is running at port 3000'));
require('dotenv').config();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    unset: "destroy",
    proxy: true,
    cookie: {
        expires: 600000,
    }
}));

app.use(express.static(__dirname));
app.use(bodyparser.json());

app.get('/login', (req, res) => {
    res.json({ username: req.session.user || null });
});

app.use(loginRouter);


app.use(Middleware);

app.use('/pointsofinterest', pointsofinterestRouter);








