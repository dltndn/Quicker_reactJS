const express = require('express');
const app = express();
const port = 3300

app.get('/', (req, res) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> roadname
    res.json({
        success: true,
    });
});

app.get('/test', (req, res) => {
    res.send("test")
<<<<<<< HEAD
=======
=======
    res.json({success: true});
});

app.post('/register', (req, res) => {
    console.log(req.body)
>>>>>>> roadname
>>>>>>> roadname
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});