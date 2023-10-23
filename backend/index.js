import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
//app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bhanu",
  database: "task",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/all/:data", (req, res) => {
  const a=req.params.data
  console.log(a)
  const q = `SELECT ponumber, Supplier, Description FROM updatednew WHERE ponumber LIKE '%${a}%'`;
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
});

app.get("/sup", (req, res) => {
  const q="SELECT DISTINCT  Supplier FROM updatednew WHERE  Supplier IS NOT NULL AND  Supplier <> '' ";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });

});

app.get("/:supplier", (req, res) => {
  const a=req.params.supplier
  console.log(a)
  const q=`SELECT DISTINCT ponumber FROM updatednew WHERE  Supplier = '${a}'`;
  console.log(req.params.supplier)
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.send(err);
    }
    return res.json(data);
  });
  
});





  


app.listen(3006, () => {
  console.log("Coned to backend.");
});