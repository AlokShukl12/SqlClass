const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password:'azamgarh@4137'
});



//  let createRandomUser=()=> {
//   return [
//     faker.string.uuid(),
//     faker.internet.username(), // before version 9.1.0, use userName()
//      faker.internet.email(),
//      faker.internet.password(),
//   ];
// };
// console.log(createRandomUser());

//home route
app.get("/",(req,res)=>{
  let q = `SELECT count(*) FROM emp`;

try {
    connection.query(q, (err, result) => {
        if (err) throw err;
        let count = result[0]["count(*)"];
        res.render("home.ejs",{count});
    });
} catch (err) {
    console.log(err);
   let q = `select * from emp`;
}
});

// show route
app.get("/user",(req,res)=>{
  let q = `select * from emp`;
  try {
    connection.query(q, (err, users) => {
        if (err) throw err;
       res.render("showUser.ejs",{users});
    });
} catch (err) {
    console.log(err);
   
}
});
//Edit route
app.get("/user/:id/edit",(req,res)=>{
  
   let {id} = req.params;
   let q= `select * from emp where id='${id}'`;

    try {
    connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
      res.render("edit.ejs",{user});
    });
} catch (err) {
    console.log(err);
    res.send("some error in DB");
   
}
});
//UPDATE ROUTE

app.patch("/user/:id",(req,res)=>{
 let {id} = req.params;
 let {password:formPass, username: newUsername}= req.body;
   let q= `select * from emp where id='${id}'`;

    try {
    connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        if(formPass != user.password){
          res.send("wrong password");
        }else{
          let q2 = `update emp set username ='${newUsername}' where id='${id}'`;
          connection.query(q2,(err,result)=>{
            if(err) throw err;
            res.redirect("/user");
          });
        }
    });
} catch (err) {
    console.log(err);
    res.send("some error in DB");
   
}
});

app.listen("8080",()=>{
  console.log("server is listing to port 8080");
});
