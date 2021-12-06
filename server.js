const express = require('express');
const ctable = require('console.table')
const mysql = require('mysql2');
const path = require('path');
const { menu, addDeptMenu, addRoleMenu, addEeMenu } = require('./helpers/inquieries')


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

let startUp = () =>{
    menu().then(ans => {
        if(ans.menuPick == 'View all Departments'){
            depts();
        }
        else if (ans.menuPick == 'View all Roles') roles()
        else if (ans.menuPick == 'View all Employees') ee()
    })
}

let depts = () =>{

    let sql = 'SELECT dept_name, id FROM depts'
    db.query(sql, (err, depts) =>{
        if (err) throw err
          
        console.table(depts)

})
}

let roles = () =>{

    let sql = 'SELECT title, id, salary, dept_id FROM roles'
    db.query(sql, (err, depts) =>{
        if (err) throw err
          
        console.table(depts)

})
}

let ee = () =>{

    let sql = 'SELECT firstName, lastName, id, manager_id, roles_id FROM ee'
    db.query(sql, (err, depts) =>{
        if (err) throw err
          
        console.table(depts)

})
}

startUp();