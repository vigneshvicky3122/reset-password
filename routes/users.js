var express = require("express");
const { Mongodb, MongoClient, DbName, DbURL } = require("../dbConfig");
const cors = require("cors");
const { hashPassword, hashCompare } = require("../bin/auth");
var router = express.Router();
const JWT = require("jsonwebtoken");
const env = require('dotenv').config();

const client = new MongoClient(DbURL);

router.use(
  cors({
    origin: "https://633481e946acaa0009344498--helloteches.netlify.app",
  })
);

let authentication = async (req, res, next) => {
  let head = req.headers.authorization; 
  try {
    let check = JWT.verify(head, process.env.SECRET_KEY);
    if (check) {
      next();
    }
  } catch (error) {
    res.json({
      statusCode: 404,
      message: "Unauthorized please login!",
    });
  }
};


/* GET users listing. */
router.get("/user", authentication, async (req, res) => {
  await client.connect();

  try {
    const db = await client.db(DbName);
    let users = await db.collection("users").find().toArray();
    res.json({
      statusCode: 200,
      users,
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      message: "internal error occurred",
      error: error,
    });
  } finally {
    client.close();
  }
});

router.get("/user/:id", authentication, async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(DbName);
    let users = await db
      .collection("users")
      .find({ _id: Mongodb.ObjectId(req.params.id) })
      .toArray();

    res.json({
      statusCode: 200,
      users,
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      message: "internal error occurred",
      error: error,
    });
  } finally {
    client.close();
  }
});

router.put("/reset/:id", authentication, async (req, res) => {
  await client.connect();

  try {
    const db = await client.db(DbName);
    let data = await db
      .collection("users")
      .find({ _id: Mongodb.ObjectId(req.params.id) })
      .toArray();

    if (data[0].email === req.body.email) {
      if (req.body.password) {
        req.body.password = await hashPassword(req.body.password);

        let users = await db
          .collection("users")
          .updateOne(
            { _id: Mongodb.ObjectId(req.params.id) },
            { $set: req.body }
          );

        res.json({
          statusCode: 200,
          message: "Do you have change the Details?",
          users,
        });
      } else {
        res.json({
          statusCode: 400,
          message: "credentials does not match (: ",
        });
      }
    } else {
      res.json({
        statusCode: 401,
        message: "invalid details email does not change",
      });
    }
  } catch (error) {
    res.json({
      statusCode: 500,
      message: "internal error occurred",
      error: error,
    });
  } finally {
    client.close();
  }
});

router.post("/sign-up", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(DbName);
    let user = await db
      .collection("users")
      .find({ email: req.body.email })
      .toArray();
    if (user.length === 0) {
      req.body.password = await hashPassword(req.body.password);
      let user = await db.collection("users").insertOne(req.body);
      if (user) {
        let token = JWT.sign({ email: user.email }, process.env.SECRET_KEY, {
          expiresIn: "5m",
        });

        res.json({
          statusCode: 200,
          message: "Do you want create a new user?",
          user,
          token,
        });
      }
    } else {
      res.json({
        statusCode: 401,
        message: "this user was already existing here Please Login!",
      });
    }
  } catch (error) {
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    client.close();
  }
});

router.post("/login", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(DbName);

    let user = await db
      .collection("users")
      .find({ email: req.body.email })
      .toArray();

    if (user.length === 1) {
      if (req.body.password === req.body.confirm_password) {
        let hashResult = await hashCompare(req.body.password, user[0].password);

        if (hashResult) {
          let token = JWT.sign({ email: user.email }, process.env.SECRET_KEY, {
            expiresIn: "5m",
          });

          res.json({
            statusCode: 200,
            message: "if you want to login!",
            token,
          });
        } else {
          res.json({
            statusCode: 401,
            message: "incorrect Details ^_^",
          });
        }
      } else {
        res.json({
          statusCode: 402,
          message: "details does not match",
        });
      }
    } else {
      res.json({
        statusCode: 408,
        message: "user does not exist Please DO Register -->",
      });
    }
  } catch {
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    client.close();
  }
});
router.post("/forgot", async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(DbName);

    let user = await db
      .collection("users")
      .find({ email: req.body.email })
      .toArray();
    if (user.length === 1) {
      if (req.body.password === req.body.confirm_password) {

          let hashpassword = await hashPassword(req.body.password);

          if (hashpassword) {
            let users = await db
              .collection("users")
              .updateOne(
                { email: req.body.email },
                { $set: { password: hashpassword } }
              );
            if (users) {
              let token = JWT.sign({ email: user.email }, process.env.SECRET_KEY, {
                expiresIn: "5m",
              });
              res.json({
                statusCode: 200,
                message: "Password changed successfully",
                token,
              });
            }
          } else {
            res.json({
              statusCode: 401,
              message: "incorrect Details ^_^",
            });
          }
        
        
      } else {
        res.json({
          statusCode: 403,
          message: "details does not match",
        });
      }
    } else {
      res.json({
        statusCode: 408,
        message: "user does not exist Please DO Register -->",
      });
    }
  } catch {
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    client.close();
  }
});

router.delete("/delete-user/:id", authentication, async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(DbName);
    let data = await db
      .collection("users")
      .deleteOne({ _id: Mongodb.ObjectId(req.params.id) });
   if (data) {
        let users = await db.collection("users").find().toArray();
      
    res.json({
      statusCode: 200,
      message: "Are you sure delete this user?",
    });}
  } catch (error) {
    res.json({
      statusCode: 500,
      message: "internal server error",
    });
  } finally {
    client.close();
  }
});

module.exports = router;
