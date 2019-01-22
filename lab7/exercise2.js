const crypto = require("crypto");

const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const PASSWORD = "asaadsaad";

app
  .get("/secret", (req, res) => {
    MongoClient.connect(
      "mongodb://localhost:27017/test",
      async (err, client) => {
        if (err) throw err;

        const db = client.db("test");

        const encryptedDocument = await db
          .collection("exercise2")
          .findOne({ _id: "message" }, { _id: 0 });

        res.send(decrypt(encryptedDocument.message));
      }
    );
  })
  .listen(8000);

function decrypt(text) {
  const decipher = crypto.createDecipher("aes-256-cbc", PASSWORD);
  let dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return {
    encryptedMessage: text,
    decryptedMessage: dec
  };
}
