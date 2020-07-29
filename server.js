const express = require('express');

const app = express();

app.use((req, res) => {
    res.json({
        message: "ok"
    })
})

const PORT = 7000;

app.listen(PORT, console.log("server started"));

