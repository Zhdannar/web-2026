const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const cookies = require("cookie-parser");
const cors = require('cors');


app.use(express.json()); 
app.use(cookies());
app.use(
    cors({
        credentials: true, 
        origin: true 
    })
);

const router = express.Router();

app.get('/', (req, res) => {
    res.status(201).json({ b: 2 });
});

app.get("/test-cookie", (req, res) => {
    console.log(req.cookies);
    res.cookie(
        'cookieName',
        'someValue', 
        {
            maxAge: 900000, 
            httpOnly: true
        }
    );
    res.json({ ok: true });
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    res.json({ id: req.params.id });
});

router.post('/', (req, res) => {
    // create item
    res.json({ created: true });
});

app.use('/items', router);

app.post('/profile', function (req, res) {
    console.log(req.body);
    res.json(req.body);
});

// 404
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.locals = res.locals || {};
    res.locals.message = err.message;
    res.locals.error = err;

    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});