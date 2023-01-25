const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2');

app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_db',
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected...');
});

// case study
// app.get('/api/products', (req, res) => {
//     let sql = "SELECT * FROM product";
//     let query = conn.query(sql, (err, results) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ "status": 200, "error": null, "response": results }))
//     });
// });

// app.get('/api/products/:id', (req, res) => {
//     let sql = "SELECT * FROM product WHERE product_id=" + req.params.id;
//     let query = conn.query(sql, (err, results) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ "status": 200, "error": null, "response": results }))
//     });
// });

// app.post('/api/products', (req, res) => {
//     let data = {
//         product_name: req.body.product_name,
//         product_price: req.body.product_price
//     };
//     let sql = "INSERT INTO product SET ?";
//     let query = conn.query(sql, data, (err, results) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ "status": 200, "error": null, "response": "Insert data success" }))
//     });
// });

// app.put('/api/products/:id', (req, res) => {
//     let sql = "UPDATE product SET product_name='" + req.body.product_name + "', product_price='" + req.body.product_price + "' WHERE product_id=" + req.params.id;
//     let query = conn.query(sql, (err, results) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ "status": 200, "error": null, "response": "Update data success" }))
//     });
// });

// app.delete('/api/products/:id', (req, res) => {
//     let sql = "DELETE FROM product WHERE product_id=" + req.params.id + "";
//     let query = conn.query(sql, (err, results) => {
//         if (err) throw err;
//         res.send(JSON.stringify({ "status": 200, "error": null, "response": "Delete data success" }))
//     });
// });

//exercise
app.get('/api/comments', (req, res) => {
    let sql = "SELECT * FROM comment ORDER BY comment_created DESC LIMIT 5";
    let query = conn.query(sql, (err, results) => {
        res.send(results)
    });
});

app.get('/api/comment/:id', (req, res) => {
    let sql = "SELECT * FROM comment WHERE comment_id=" + req.params.id + "";
    let query = conn.query(sql, (err, results) => {
        res.send(results)
    });
});

app.get('/api/comments/customer/:id', (req, res) => {
    let sql = "SELECT * FROM comment WHERE cust_id=" + req.params.id + " ORDER BY comment_created ASC";
    let query = conn.query(sql, (err, results) => {
        res.send(results)
    });
});

app.post('/api/comments', (req, res) => {
    let data = {
        cust_id: req.body.cust_id,
        product_id: req.body.product_id,
        comment_text: req.body.comment_text
    }
    let sql = "INSERT INTO comment SET ?";
    let query = conn.query(sql, data, (err, results) => {
        res.send({ "status": "SUCCESS" })
    });
});

app.delete('/api/comment/:id', (req, res) => {
    let sql = "DELETE FROM comment WHERE comment_id=" + req.params.id + "";
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.send({ "status": "DELETED" })
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000...')
})