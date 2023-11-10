const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const audioFilePath = path.join(__dirname, "../sound");

router.use(express.static(__dirname));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use((req, res, next) => {
  req.io = req.app.get("io");
  next();
});

router.post("/piano", (req, res) => {
  console.log(req.body.note);
  const note = req.body.note;
  switch (note) {
    case "C":
      fs.readFile(
        path.join(audioFilePath, "pianoC.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "D":
      fs.readFile(
        path.join(audioFilePath, "pianoD.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "E":
      fs.readFile(
        path.join(audioFilePath, "pianoE.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "F":
      fs.readFile(
        path.join(audioFilePath, "pianoF.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "G":
      fs.readFile(
        path.join(audioFilePath, "pianoG.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "A":
      fs.readFile(
        path.join(audioFilePath, "pianoA.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "C+":
      fs.readFile(
        path.join(audioFilePath, "pianoC+.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    default:
      res.send("Default behavior...");
      break;
  }

  res.status(200).send(req.body.note);
});

router.post("/sym", (req, res) => {
  console.log(req.body.note);
  const note = req.body.note;
  if (note === "O") {
    fs.readFile(
      path.join(audioFilePath, "sym.mp3"),
      { encoding: "base64" },
      (err, data) => {
        if (err) {
          console.error("Error reading audio file: ", err);
          return;
        }
        req.io.emit("audio", data);
      }
    );
  } else {
    res.send("sym is not playing");
  }
  req.io.emit("inst", "sym");
  res.status(200).send(req.body.note);
});

router.post("/tri", (req, res) => {
  console.log(req.body.note);
  const note = req.body.note;
  if (note === "O") {
    fs.readFile(
      path.join(audioFilePath, "tri.mp3"),
      { encoding: "base64" },
      (err, data) => {
        if (err) {
          console.error("Error reading audio file: ", err);
          return;
        }
        req.io.emit("audio", data);
      }
    );
  } else {
    res.send("sym is not playing");
  }
  req.io.emit("inst", "tri");
  res.status(200).send(req.body.note);
});

router.post("/cats", (req, res) => {
  console.log(req.body.note);
  const note = req.body.note;
  if (note === "O") {
    fs.readFile(
      path.join(audioFilePath, "cats.mp3"),
      { encoding: "base64" },
      (err, data) => {
        if (err) {
          console.error("Error reading audio file: ", err);
          return;
        }
        req.io.emit("audio", data);
      }
    );
  } else {
    res.send("cats is not playing");
  }
  req.io.emit("inst", "cats");
  res.status(200).send(req.body.note);
});

router.post("/drum1", (req, res) => {
  console.log(req.body.note);
  const note = req.body.note;
  if (note === "O") {
    fs.readFile(
      path.join(audioFilePath, "drum1.mp3"),
      { encoding: "base64" },
      (err, data) => {
        if (err) {
          console.error("Error reading audio file: ", err);
          return;
        }
        req.io.emit("audio", data);
      }
    );
  } else {
    res.send("drum is not playing");
  }
  req.io.emit("inst", "drum");
  res.status(200).send(req.body.note);
});

router.post("/drum2", (req, res) => {
  console.log(req.body.note);
  const note = req.body.note;
  if (note === "O") {
    fs.readFile(
      path.join(audioFilePath, "drum2.mp3"),
      { encoding: "base64" },
      (err, data) => {
        if (err) {
          console.error("Error reading audio file: ", err);
          return;
        }
        req.io.emit("audio", data);
      }
    );
  } else {
    res.send("drum is not playing");
  }
  req.io.emit("inst", "drum");
  res.status(200).send(req.body.note);
});

module.exports = router;
