// require('dotenv').config()
const { json } = require('express');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 8000;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "shhh its a secret";


app.use(express(json));
app.use(express.urlencoded({ extended: true }));


const postData = [
    {
        username: "John",
        title: "post 1"
    },
    {
        username: "Bob",
        title: "post 2"
    }
]

app.get('/posts', (req, res) => {
    res.json(postData);
})

app.post('/login', (req, res) => {
console.log(req.body)
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
})


app.listen(PORT, () =>
    console.log(`studiously serving silly sounds on port http://localhost:${PORT}`)
);


//sudo kill -9 $(sudo lsof -t -i:8000)
//fuser -k 8000/tcp