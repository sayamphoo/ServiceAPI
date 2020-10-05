const express = require("express");
const app = express();
const mysql = require("./databast/mysql_connect");
const myData = require("./databast/mysql_data");

app.get("/login", function (ree, res) {
  var name = ree.query.name;
  var pass = ree.query.pass;
  myData.chackLogin(mysql.con, res, name, pass);
});

app.get("/addmembers", function (ree, res) {
  myData.addMembers(
    mysql.con,res,"dd",ree.query.user,"12345678",false
  );
});
app.get("   e", function (ree, res) {
  const token = ree.query.token;
  myData.getDataProfile(mysql.con, res, token);
});

const port = process.env.port || 4000;
app.listen(port, function () {
  console.log("Starting node.js on port ", port);
});
