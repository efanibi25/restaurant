const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '137.117.84.69',
  user: 'azureuser',
  password: 'bNVDN%HH@Vv52u',
  database: 'cs340'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get("/get_customers", (req, res) => {
    connection.query(`SELECT * FROM customers`, (err, results) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
    
        if (results.length) {
          console.log("found tutorial: ", results);
          res.send(results)
          return;
        }
    
        // not found Tutorial with the id
        res.send({ kind: "not_found" });
      });
  });


  app.get("/get_waiters", (req, res) => {
    connection.query(`SELECT * FROM waiters`, (err, results) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
    
        if (results.length) {
          console.log("found tutorial: ", results);
          res.send(results)
          return;
        }
    
        // not found Tutorial with the id
        res.send({ kind: "not_found" });
      });
  });




  app.get("/get_waitlist", (req, res) => {
    connection.query(`SELECT * FROM waiter_list`, (err, results) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
    
        if (results.length) {
          console.log("found tutorial: ", results);
          res.send(results)
          return;
        }
    
        // not found Tutorial with the id
        res.send({ kind: "not_found" });
      });
  });


  app.get("/get_vistors", (req, res) => {
    connection.query(`SELECT * FROM vistors`, (err, results) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
    
        if (results.length) {
          console.log("found tutorial: ", results);
          res.send(results)
          return;
        }
    
        // not found Tutorial with the id
        res.send({ kind: "not_found" });
      });
  });

  app.get("/get_waiters", (req, res) => {
    connection.query(`SELECT * FROM waiters`, (err, results) => {
        if (err) {
          console.log("error: ", err);
          return;
        }
    
        if (results.length) {
          console.log("found tutorial: ", results);
          res.send(results)
          return;
        }
    
        // not found Tutorial with the id
        res.send({ kind: "not_found" });
      });
  });