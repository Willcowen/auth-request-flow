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

router.post("/login", (req, res) => {
  const payload = {
    username: mockUser.username,
  };
  const token = jwt.sign(payload, secretKey);
  res.json({ token });
});

router.get("/profile", (req, res) => {
  try {
    const token = req.headers.authorization.substring(7);
    jwt.verify(token, secretKey);
    res.json({ profile: mockUser.profile });
  } catch (err) {
    res.status(401).json({ error: "profile not found" });
  }
});

module.exports = router;
