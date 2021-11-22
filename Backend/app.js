const mysql = require('mysql');
const pool = mysql.createPool({
  host: '137.117.84.69',
  user: 'azureuser',
  password: 'bNVDN%HH@Vv52u',
  database: 'cs340'
});


const express = require("express");
const app = express();
app.use(express.urlencoded());
app.use(express.json());


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.get("/api/get_customers", (req, res) => {
    pool.getConnection(function(err, connection){    
        //run the query
        connection.query('select * from customers',  function(err, rows){
            try{
               if(rows){
                res.send(rows)
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

app.get("/api/get_waiters", (req, res) => {
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query('select * from waiters',  function(err, rows){
          try{
             if(rows){
              res.send(rows)

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




app.get("/api/get_waitlist", (req, res) => {
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query('select * from waiting_lists',  function(err, rows){
        try{
             if(rows){
              res.send(rows)

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


app.get("/api/get_visits", (req, res) => {
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query('select * from visits',  function(err, rows){
          try{
             if(rows){
              res.send(rows)

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



app.get("/api/get_diningtables", (req, res) => {
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query('select * from dining_tables',  function(err, rows){
          try{
             if(rows){
              res.send(rows)

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


app.post("/api/add_customers", (req, res) => {
  const {name,phone}=req.body
  if(phone.length!=12 || !name){
    return
  }
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query(`INSERT INTO customers (customer_name,customer_phone) VALUES ("${name}","${phone}")`,  function(err, value){
          console.log(value,err)
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

