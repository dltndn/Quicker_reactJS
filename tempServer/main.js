const axios = require("axios");
const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/getRequestKey", async (req, res) => {
  try {
    const para = req.body.data
    const data = await axios.post(
      `https://a2a-api.klipwallet.com/v2/a2a/prepare`,
      para,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.send(data.data.request_key)
  } catch (error) {
    // console.log(error)
    res.send(error);
  }
});

app.post("/getResult", async (req, res) => {
    try {
      const para = req.body.data
      console.log(para)
      const data = await axios.get(
        `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${para}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res.send(data.data)
    } catch (error) {
      // console.log(error)
      res.send(error);
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
