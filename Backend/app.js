const mysql = require('mysql');
const pool = mysql.createPool({
  host: '137.117.84.69',
  user: 'azureuser',
  password: 'bNVDN%HH@Vv52u',
  database: 'cs340'
});


const express = require("express");
const app = express();

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
                console.log(rows)
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
              console.log(rows)
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




app.get("/api/get_waiterlist", (req, res) => {
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query('select * from waiter_list',  function(err, rows){
          try{
             if(rows){
              res.send(rows)
              console.log(rows)
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


app.get("/api/get_vistors", (req, res) => {
  pool.getConnection(function(err, connection){    
      //run the query
      connection.query('select * from vistors',  function(err, rows){
          try{
             if(rows){
              res.send(rows)
              console.log(rows)
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
              console.log(rows)
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

