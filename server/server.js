const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());


app.post("/editarboleto", (req, res) => {
    console.log("body", req.body);
    const data = req.body;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");   
    myHeaders.append("Authorization", data.authObj);
    myHeaders.append("Cookie", "49dcc057421d66c921b9cd0221ea1d49=fc3c82af4ab7d065cc1b686c9b5ad12b; 49dcc057421d66c921b9cd0221ea1d49=fc3c82af4ab7d065cc1b686c9b5ad12b");

    var raw = JSON.stringify(data.body_req);

    var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        // redirect: 'follow'
    };
    fetch(data.url, requestOptions)
        .then(response => response.json())
        .then(result =>  res.send(result))
        .catch(error => console.log('error', error));
})


app.listen(8000, () => {
    console.log("server is running");
    
})