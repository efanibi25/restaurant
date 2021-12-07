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

app.get("/api/get_customers", (req, res) => {

  pool.getConnection(function (err, connection) {
    //run the query
    connection.query('select * from customers', function (err, rows) {
      try {
        if (rows) {
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

app.post("/api/add_customer", (req, res) => {
  const { customer_name, customer_phone } = req.body

  // console.log(req.body)

  pool.getConnection(function (err, connection) {

    const query = `INSERT INTO customers (customer_name, customer_phone) VALUES (?, ?)`
    const values = [customer_name, customer_phone]

    connection.query(query, values, function (err,value) {

      if (err) {
        return console.error(err.message)
      }
      connection.release() //release the connection
      res.send("success")      
    });
  });
});


app.put("/api/update_customer", (req, res) => {

  const { customer_id, customer_name, customer_phone } = req.body

  pool.getConnection(function (err, connection) {

    const query = `UPDATE customers SET ? WHERE customer_id = ?`

    const values = [{customer_name: customer_name, customer_phone: customer_phone}, customer_id]

    connection.query(query, values, function (err) {
      if (err) {
        return console.error(err.message)
      }
      connection.release() //release the connection
      res.send("success")      
    });
  });
});

app.delete("/api/remove_customer", (req, res) => {

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


app.get("/api/get_waiters", (req, res) => {
  pool.getConnection(function (err, connection) {
    //run the query
    connection.query('select * from waiters', function (err, rows) {
      try {
        if (rows) {
          res.send(rows)
          // console.log(rows)
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


app.post("/api/add_waiter", (req, res) => {
  const {name}=req.body
  if(!name){
    return
  }
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query(`INSERT INTO waiters (waiter_name) VALUES (?)`, [name], function(err, value){
        try{
             if(value){
              res.send({"output":true})

             }
             else{
               res.send({"output":false})
             }
             
              
          }
          catch(error){
          console.log(error)
          res.send({ "error": error });
          }     
      connection.release();//release the connection
    });
}
);
});

app.put("/api/update_waiter", (req, res) => {

  const { waiter_id,waiter_name} = req.body
  // console.log(waiter_id,waiter_name)

  pool.getConnection(function (err, connection) {

    const query = `UPDATE waiters SET ? WHERE waiter_id = ?`

    const values = [{waiter_name: waiter_name}, waiter_id]

    connection.query(query, values, function (err) {
      if (err) {
        return console.error(err.message)
      }
      connection.release() //release the connection
      res.send("success")      
    });
  });
});


app.delete("/api/remove_waiter", (req, res) => {

  const { waiter_id} = req.body
  // console.log(waiter_id)

  pool.getConnection(function (err, connection) {

    const query = `DELETE FROM waiters WHERE waiter_id = ?`
    const values = [waiter_id]

    connection.query(query, values, function (err) {
      if (err) {
        return console.error(err.message)
      }
      connection.release() //release the connection
      res.send("success")
    });
  });
});






app.get("/api/get_waitlist", (req, res) => {
  pool.getConnection(function (err, connection) {
    //run the query
    connection.query('select * from waiting_lists', function (err, rows) {
      // console.log(rows,"is this")
      try {
        if (rows) {
          // console.log(rows)
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

app.post("/api/add_waitinglist", (req, res) => {
  // const {num_seat,customer_id,reserved_time,requested_feature_id,is_seated}=req.body

  const values=Object.keys(req.body).reduce((prev,curr,index
    )=>{
      if(req.body[curr]=="null"){
        return prev
      }
      if(prev==""){
        return prev+"?"
      }
      else{
        return prev+",?"
      }
    },"")

    const valuesList=Object.keys(req.body).reduce((prev,curr,index
      )=>{
        if(req.body[curr]=="null"){
          return prev
        }
        if(prev==""){
          return prev+curr
        }
        else{
          return prev+`,${curr}`
        }
      },"")

  

  const keys=Object.keys(req.body).reduce(
    (prev,curr)=>{
      if(req.body[curr]=="null"){
        return prev
      }
      else{
        let newvalue=req.body[curr]
        console.log(newvalue)
        prev.push(newvalue)
        return prev
      }
    },[]
  )
  console.log(values,keys,valuesList)
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query(`INSERT INTO waiting_lists (${valuesList}) VALUES (${values})`,keys,  function(err, value){        console.log(value)
        try{
             if(value){
              res.send({"output":true})

             }
             else{
               res.send({"output":false})
             }
             
              
          }
          catch(error){
          console.log(error)
          res.send({ "error": error });
          }     
      connection.release();//release the connection
    });
}
);
});

app.delete("/api/remove_waitinglist", (req, res) => {

  const { queue_id } = req.body


  pool.getConnection(function (err, connection) {

    const query = `DELETE FROM waiting_lists WHERE queue_id = ?`
    const values = [queue_id ]

    connection.query(query, values, function (err) {
      if (err) {
        return console.error(err.message)
      }
      connection.release() //release the connection
      res.send("success")
    });
  });
});





app.get("/api/get_visits", (req, res) => {
  pool.getConnection(function (err, connection) {
    //run the query




    const query = `SELECT visit_id, 
                          table_id, 
                          customers.customer_id as customer_id, 
                          customer_name, 
                          waiters.waiter_id as waiter_id,
                          waiter_name, 
                          num_guest, 
                          time_start, 
                          time_stop, 
                          check_amount, 
                          tips_amount, 
                          check_amount + tips_amount AS total_amount 
                          FROM visits INNER JOIN customers ON visits.customer_id = customers.customer_id 
                          INNER JOIN waiters ON visits.waiter_id = waiters.waiter_id 
                          ORDER BY time_start DESC;`

    connection.query(query, function (err, rows) {
      try {
        if (rows) {
          console.log(rows)
          res.send(rows)
          // console.log(rows)
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


app.post("/api/add_visit", (req, res) => {

  const {customer_id,waiter_id,num_guest,time_start,time_stop,check_amount,tips_amount,table_id
  }=req.body
  // console.log(check_amount,tips_amount)
  let list=["customer_id","waiter_id","num_guest","time_start","time_stop","check_amount","tips_amount","table_id"]
  if(Object.keys(req.body).reduce((previousValue, currentValue) => { 
    if(list.includes(currentValue)){
      previousValue.add(currentValue)
    }
    return previousValue

  }, new Set()).size!=list.length){
    return
  }
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query(`INSERT INTO visits (waiter_id,num_guest,time_start,time_stop,check_amount,tips_amount,table_id) VALUES (?,?,?,?,?,?,?,?)`, [customer_id,waiter_id,num_guest,time_start,time_stop,check_amount,tips_amount,table_id], function(err, value){
        try{
             if(value){
              res.send({"output":true})

             }
             else{
               res.send({"output":false})
             }
          }
          catch(error){
          console.log(error)
          res.send({ "error": error });
          }     
      connection.release();//release the connection
    });
}
);
});

//Put Remove Function Here
app.delete("/api/remove_visit", (req, res) => {

  console.log(req.body)
  const { visit_id } = req.body

  console.log("visit_id", visit_id)

  pool.getConnection(function (err, connection) {

    const query = `DELETE FROM visits WHERE visit_id = ?`
    const values = [visit_id]

    connection.query(query, values, function (err) {
      if (err) {
        return console.error(err.message)
      }
      connection.release() //release the connection
      res.send("success")
    });
  });
});


app.get("/api/get_diningtables", (req, res) => {
  pool.getConnection(function (err, connection) {

    query = `SELECT table_id, num_seat, feature_description, table_features.feature_id as feature_id
              FROM dining_tables LEFT JOIN table_features
              ON dining_tables.feature_id = table_features.feature_id
              ORDER BY table_id ASC;`
              
    //run the query
    connection.query(query, function (err, rows) {
      try {
        if (rows) {
          res.send(rows)
          // console.log(rows)
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

app.post("/api/add_diningtable", (req, res) => {
  const {num_seat,feature_id}=req.body
  if(!num_seat || !feature_id){
    return
  }
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query(`INSERT INTO dining_tables (num_seat,feature_id) VALUES (?,?)`,[num_seat,feature_id],  function(err, value){
        try{
             if(value){
              res.send({"output":true})

             }
             else{
               res.send({"output":false})
             }
             
              
          }
          catch(error){
          console.log(error)
          res.send({ "error": error });
          }     
      connection.release();//release the connection
    });
}
);
});

//Add remove Function Here