const express = require('express')

const {
    menu, 
    addDeptMenu, 
    addRoleMenu, 
    addEeMenu
  } = require('./helpers/inquieries');


let PORT = 3001
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

app.get('/api/depts', (req, res) =>{
    let sql = 'SELECT '
    db.query(sql, (err, depts) =>{
        if (err) {
            res.status(500).json({ error: err.message });
             return;
          }
        res.json({
            message: 'Departments Retrieved',
            Departments: depts.dept_name})
    })
})

app.listen(PORT, (req,res) => {
    console.log(`App now listening at localhost:${PORT}`) 
})