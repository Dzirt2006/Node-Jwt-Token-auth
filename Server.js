// require('dotenv').config()
const { json } = require('express');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 8000;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "shhh its a secret";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const postData = [
    {
        username: "John",
        title: "post 1"
    },
    {
        username: "Alex",
        title: "post 2"
    }
]

app.get('/posts', authToken, (req, res) => {
    res.json(postData.filter(post => post.username === req.user.name)); //req to db
})


function authToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]; //if aHeader return ah.split | undefined
    console.log(token)
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next()//move on from middleware
    })
}


app.listen(PORT, () =>
    console.log(`studiously serving silly sounds on port http://localhost:${PORT}`)
);


//sudo kill -9 $(sudo lsof -t -i:8000)
//fuser -k 8000/tcp