const express = require('express');
const app = express();
const port = 3300

app.get('/', (req, res) => {
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> roadname
>>>>>>> 146dc51f055aa3df9df50f01cffc12fbbb37b3e9
    res.json({
        success: true,
    });
});

app.get('/test', (req, res) => {
    res.send("test")
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
=======
    res.json({success: true});
});

app.post('/register', (req, res) => {
    console.log(req.body)
>>>>>>> roadname
>>>>>>> roadname
>>>>>>> 146dc51f055aa3df9df50f01cffc12fbbb37b3e9
});

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});