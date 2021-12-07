const mysql = require('mysql2');
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
        if(ans.menuPick == 'View all Departments'){ depts();}
        else if (ans.menuPick == 'View all Roles') roles();
        else if (ans.menuPick == 'View all Employees') ee();
        else if (ans.menuPick == 'Add a Department') addDeptMenu().then((deptAns) => addDept(deptAns));
        else if (ans.menuPick == 'Add a Role') addRoleMenu().then((roleAns)=>addRole(roleAns));
        else if (ans.menuPick == 'Add an Employee') addEeMenu().then((eeAns)=>addee(eeAns));
        else{ 
            console.log('Goodbye')
            return process.exit(1)
        }
    })
}

let depts = () =>{

    let sql = 'SELECT dept_name, id FROM depts'
    let params = ["Sales"]
    db.query(sql, params, (err, depts) =>{
        if (err) throw err
          
        console.table(depts)
        startUp()

})
}

let roles = () =>{

    let sql = 'SELECT title, id, salary, dept_id FROM roles'
    db.query(sql, (err, roles) =>{
        if (err) throw err
          
        console.table(roles)
        startUp()
})
}

let ee = () =>{

    let sql = 'SELECT firstName, lastName, id, manager_id, roles_id FROM ee'
    db.query(sql, (err, ees) =>{
        if (err) throw err
          
        console.table(ees)
        startUp()
})
}

let addDept = (deptAns) =>{
    let sql = `INSERT INTO depts (dept_name)
    VALUES (?)`
    let params = [deptAns.deptName]
    console.log(deptAns.deptName)
    db.query(sql,params,  (err, depts) =>{
        if (err) throw err
          
    depts()
})
};
let addRole = (roleAns) =>{
    let sql = 'SELECT id FROM depts WHERE dept_name=(?)'
    let param = [roleAns.roleDept]
    db.query(sql,param,  (err, depts) =>{
        if (err) throw err
        let deptId = Object.values(depts[0])
        let sqlIn = `INSERT INTO roles (title, salary, dept_id)
        VALUES (?,?,?)`
        let params = [roleAns.roleName, roleAns.roleSalary, deptId[0]]

        db.query(sqlIn, params,  (error, role) =>{
            if (error) throw error
            
            console.table(role)
            roles()
        })
})
};
let addee = (eeAns) =>{
    let sql = 'SELECT id FROM roles WHERE title=(?)'
    let param = [eeAns.eeRole]
    db.query(sql,param,  (err, roles) =>{
        if (err) throw err
        let id = Object.values(roles[0])
        let man= ''
        if(eeAns.eeman == ''){ man = null}
        else man = eeAns.eeman
        let sqlIn = `INSERT INTO ee (firstName, lastName,roles_id, manager_id)
        VALUES (?,?,?,?)`
        let params = [eeAns.eeFirst, eeAns.eeLast, id[0], man]

        db.query(sqlIn, params,  (error, ees) =>{
            if (error) throw error
            
            console.table(ees)
            ee();
        })
})
};
startUp();