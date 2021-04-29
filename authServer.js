// require('dotenv').config()
const { json } = require('express');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const PORT = process.env.PORT || 4000;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "shhh its a secret";
const RESRESH_TOKEN_SECRET = process.env.RESRESH_TOKEN_SECRET || "shhh its a BIGEST secret";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const refreshedTokens = [];

app.post('/token', (req, res) => {
    console.log(refreshedTokens);
    const refreshedToken = req.body.token;
    if (refreshedToken == null) return res.sendStatus(401)
    if (!refreshedTokens.includes(refreshedToken)) return res.sendStatus(403);
    jwt.verify(refreshedToken, RESRESH_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403);
        console.log(user)
        const accessToken = genAccessToken({ name: user.name });
        res.json({ accessToken: accessToken });
    })
})

//Authenticate user
app.post('/login', (req, res) => {
    const username = req.body.username;
    const user = { name: username };
    console.log('user here!!! => ', user)
    const accessToken = genAccessToken(user);
    const refreshToken = jwt.sign(user, RESRESH_TOKEN_SECRET);
    refreshedTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
})


function genAccessToken(user) {
    return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}


app.listen(PORT, () =>
    console.log(`studiously serving silly sounds on port http://localhost:${PORT}`)
);


//sudo kill -9 $(sudo lsof -t -i:8000)
//fuser -k 8000/tcp