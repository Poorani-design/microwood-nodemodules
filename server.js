const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const mysql = require("mysql");

server.use(bodyParser.json());
// server.use(express.bodyParser());
var cors = require("cors");
// cors must be defined with server.use(cors()) , data will insert undefined only...
server.use(cors());
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"mept",
    port:3306
})

// for above port check xampp mysql port number, must be same as xampp mysql
db.connect((err)=>{
    if(err){
        return err;
    }
})

//get all data
server.get("/enquiry/user/", (req, res) => {
    console.log("get user successfully...");
    let qr = "select * from enquiry";
    db.query(qr, (err, result) => {
      if (err) {
        console.log(err, "error");
      }
      if (result.length > 0) {
     
        res.send({
          message: "get all user successfully",
          data: result,
        });
      
      }
    });
  });

//   CURRENT DATE AND TIME
var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
console.log(formatted);

//create data ===> POST
server.post("/enquiry/create", (req, res) => {
    console.log(req.body);
    
    var ename = 'Poorani';
    var email=req.body.email;
    var emobile = req.body.emobile;
    var edesc = req.body.edesc;
    var edatetime = formatted;
    console.log("name ");
console.log(req.body.email);
    let qr = `INSERT INTO enquiry(ename, email, emobile, edesc, edatetime) VALUES (
            '${ename}',
            '${email}',
            '${emobile}',
            '${edesc}',
            '${edatetime}'
            )`;
            console.log(qr);
    db.query(qr, (err, result) => {
      if (err) {
        console.log(err, "error");
      }
      console.log(result, "result");
      res.send({
        message: "single data inserted successfully..",
        data:result
      });
    });
  });
  



server.listen(3000,()=>{
    console.log("server running ");
})