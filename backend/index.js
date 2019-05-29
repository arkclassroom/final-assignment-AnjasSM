const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser"); //body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header( "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
  next()
});

//port declaration
const port = 4000;
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});

//homepage
app.get('/',(req, res, next) => {
    res.send(`Backend Running on Port : ${port}`);
});

//get items from db
app.get('/items',(req,res,next) => {
    const sql = 'select * from Items'

    db.all(sql, (err,data) => {
        if(err) res.json({"error": err.message})
        res.json(data)
    })
})

//get items from db by id
app.get('/items/:id', (req,res,next) => {
    const sql = "select * from Items where id = ?"
    const params = req.params.id
  
    db.get(sql,params, (err,data) => {
        if(err) res.json({"error" : err.message})
        res.json(data)
    })
  })

//add items to db
app.post('/items', (req,res,next) => {
    const sql = "insert into Items(productName,category,price,stock) values(?,?,?,?)"
    const params = [req.body.productName,req.body.category,req.body.price,req.body.stock];

    db.run(sql, params, (err, data) => {
        if(err) res.json({"error": err.message})
        res.json({"message": "items added"})
    })
});

//update items from db
app.put('/items/:id', (res, req, next) => {
    const sql = `update Items set 
        productName = ?,
        category = ?,
        price = ?,
        stock = ?`
    const params = [req.body.productName,req.body.category,req.body.price,req.body.stock];

    db.run(sql, params, (err, data) => {
        if(err) res.json({"error": err.message})
        res.json({"message": "items updated"})
    })
})

//delete items from db
app.delete('/items/:id', (req, res, next) => {
    const sql = "delete from Items from where id = ?"
    const params = req.params.id;

    db.run(sql, params, (req, res) => {
        if(err) res.json({"error":err.message})
        res.json({"message": "items deleted"})
    })
})

//get Users from db
app.get('/users', (req,res, next) => {
    const sql = "select * from Users"
    
    db.all(sql, (err, data) => {
        if(err) res.json({"error": err.message})
        res.json(data)
    })
})

//get Users by id
app.get('/users/:id', (res, req, next) => {
    const sql = "select * from Items where id = ?"
    const params = req.params.id

    db.get(sql, params, (res, data) => {
        if(err) res.json({"error": err.message})
        res.json(data)
    })
})





