const express = require('express');
const app = express();
const port = 3300

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

app.get('/test', (req, res) => {
    res.send("test")
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});