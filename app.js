const express = require('express')
const app = express()
const port = 80

app.get('/', function(req, res){
    try {
        console.log(__dirname + "/index.html");
        res.sendFile(__dirname + '/index.html');

    } catch (Error) {
        console.log(Error);
    }
});
    

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})