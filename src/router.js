const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

const secretKey = "secret";
const noAccessMessage = 'Invalid login details'

router.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
      if (req.body.username === mockUser.username && req.body.password === mockUser.password) {
        res.status(200).json(jwt.sign({ username: mockUser.username }, secretKey));
        return
      }
    }
    res.status(401).json(noAccessMessage);
  });

router.get("/profile", (req, res) => {
  try {
    const token = req.headers.authorization.substring(7);
    jwt.verify(token, secretKey);
    res.status(200).json({ profile: mockUser.profile });
  } catch (err) {
    res.status(401).json({ error: "profile not found" });
  }
});

module.exports = router;
