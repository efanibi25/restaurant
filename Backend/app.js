const mysql = require('mysql');
const pool = mysql.createPool({
  host: '137.117.84.69',
  user: 'azureuser',
  password: 'bNVDN%HH@Vv52u',
  database: 'cs340'
});


const express = require("express");
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get("/get_customers", (req, res) => {
  pool.getConnection(function (err, connection) {
    //run the query
    connection.query('select * from customers', function (err, rows) {
      try {
        if (rows) {
          console.log(rows)
          res.send(rows)
        }
      }
      catch (error) {
        console.log(error)
        res.send({ "error": error });
      }
      connection.release();//release the connection
    });
  }
  );
});

app.put("/add_customer", (req, res) => {

  const { customer_name, customer_phone } = req.body

  pool.getConnection(function (err, connection) {

    const query = `INSERT INTO customers (customer_name, customer_phone) VALUES (?, ?)`
    const values = [customer_name, customer_phone]

    connection.query(query, values, function (err) {
      if (err) {
        return console.error(err.message)
      }
      connection.release() //release the connection
      res.send("success")      
    });
  });
});


app.put("/update_customer", (req, res) => {

  const { customer_id, customer_name, customer_phone } = req.body

  pool.getConnection(function (err, connection) {

    const query = `UPDATE customers SET ? WHERE customer_id = ?`

    const values = [{customer_name: customer_name, customer_phone: customer_phone}, customer_id]

    console.log("Updateing values")

    connection.query(query, values, function (err) {
      if (err) {
        return console.error(err.message)
      }
      connection.release() //release the connection
      console.log("success")
      res.send("success")      
    });
  });
});

app.delete("/remove_customer", (req, res) => {

  const { customer_id } = req.body

  pool.getConnection(function (err, connection) {

    const query = `DELETE FROM customers WHERE customer_id = ?`
    const values = [customer_id]

    connection.query(query, values, function (err) {
      if (err) {
        return console.error(err.message)
      }
      connection.release() //release the connection
      res.send("success")
    });
  });
});


app.get("/get_waiters", (req, res) => {
  pool.getConnection(function (err, connection) {
    //run the query
    connection.query('select * from waiters', function (err, rows) {
      try {
        if (rows) {
          res.send(rows)
          console.log(rows)
        }
      }
      catch (error) {
        console.log(error)
      }
      connection.release();//release the connection
    });
  }
  );
});




app.get("/get_waiterlist", (req, res) => {
  pool.getConnection(function (err, connection) {
    //run the query
    connection.query('select * from waiter_list', function (err, rows) {
      try {
        if (rows) {
          console.log(rows)
          res.send(rows)
        }


      }
      catch (error) {
        console.log(error)
        res.send({ "error": error });
      }
      connection.release();//release the connection
    });
  }
  );
});


app.get("/get_vistors", (req, res) => {
  pool.getConnection(function (err, connection) {
    //run the query
    connection.query('select * from vistors', function (err, rows) {
      try {
        if (rows) {
          res.send(rows)
          console.log(rows)
        }


      }
      catch (error) {
        console.log(error)
        res.send({ "error": error });
      }
      connection.release();//release the connection
    });
  }
  );
});



app.get("/get_diningtables", (req, res) => {
  pool.getConnection(function (err, connection) {
    //run the query
    connection.query('select * from dining_tables', function (err, rows) {
      try {
        if (rows) {
          res.send(rows)
          console.log(rows)
        }


      }
      catch (error) {
        console.log(error)
        res.send({ "error": error });
      }
      connection.release();//release the connection
    });
  }
  );
});

