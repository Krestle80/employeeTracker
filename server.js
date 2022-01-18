const mysql = require('mysql2');
const { menu, addDeptMenu, addRoleMenu, addEeMenu, SelectEeMenu, EeUpdateMenu, eeFirst, eeLast, eeRole, eeMan } = require('./helpers/inquieries');



const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );
// main else if chain for the Main menu
let startUp = () =>{
    menu().then(ans => {
        if(ans.menuPick == 'View all Departments'){ depts();}
        else if (ans.menuPick == 'View all Roles') roles();
        else if (ans.menuPick == 'View all Employees') ee();
        else if (ans.menuPick == 'Add a Department') addDeptMenu().then((deptAns) => addDept(deptAns));
        else if (ans.menuPick == 'Add a Role') addRoleMenu().then((roleAns)=>addRole(roleAns));
        else if (ans.menuPick == 'Add an Employee') addEeMenu().then((eeAns)=>addee(eeAns));
        else if (ans.menuPick == "Update an Employee's data") {
            //Menu for changing any employee's row
            SelectEeMenu().then((selectEeans)=>startEeUpdate(selectEeans.eeFirst, selectEeans.eeLast)
        )
        }
        else{ 
            console.log('Goodbye')
            return process.exit(1)
        }
    })
}
//else if chain for the update Menu 
let startEeUpdate = (employeeFirst, employeeLast) =>{
    EeUpdateMenu(employeeFirst, employeeLast).then((updateEeAns)=>{
        if(updateEeAns.eeUpdateMenu == 'First Name'){ eeFirst().then((firstAns)=> firstNameUpdate(firstAns.eeFirst, employeeFirst, employeeLast))}
        else if (updateEeAns.eeUpdateMenu == 'Last Name') {eeLast().then((lastAns)=> lastNameUpdate(lastAns.eeLast, employeeFirst, employeeLast))}
        else if (updateEeAns.eeUpdateMenu == 'Role'){eeRole().then((eeRoleAns)=> eeRoleUpdate(eeRoleAns.eeRole, employeeFirst, employeeLast))}
        else if (updateEeAns.eeUpdateMenu == 'Manager'){eeMan().then((manAns)=>eeManUpdate(manAns.manId, employeeFirst, employeeLast))}
        else {startUp()
            console.log('43')}
        
    })
    
}   
//all Table calls
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

// all add Row functions
let addDept = (deptAns) =>{
    let sql = `INSERT INTO depts (dept_name)
    VALUES (?)`
    let params = [deptAns.deptName]
    console.log(deptAns.deptName)
    db.query(sql,params,  (err, dept) =>{
        if (err) throw err
        return depts()
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
            ee();
        })
})
};

// All employee database update functions
let firstNameUpdate = (newFirst, first, last) =>{
    let sql = `Update ee SET firstName=?  WHERE firstName=? AND lastName= ?`
    let params = [newFirst, first, last]
    db.query(sql,params,  (err, emp) =>{
        if (err) throw err
          console.log('Update SuccessFul')
        EeUpdateMenu(newFirst, last)
    })
}
let lastNameUpdate = (newLast, first, last) =>{
    let sql = `Update ee SET lastName=?  WHERE firstName=? AND lastName= ?`
    let params = [newLast, first, last]
    db.query(sql,params,  (err, emp) =>{
        if (err) throw err
        console.log('Update SuccessFul')
        EeUpdateMenu(first, newLast)
    })
}
let eeRoleUpdate = (newRole, first, last) =>{
    let sql = 'SELECT id FROM roles WHERE title=(?)'
    let param = [newRole]
    db.query(sql,param,  (err, roles) =>{
        if (err) throw err
        let id = Object.values(roles[0])
        let sql1 = `Update ee SET roles_id=?  WHERE firstName=? AND lastName= ?`
        let params = [id, first, last]
        db.query(sql1,params,  (errs, emp) =>{
            if (errs) throw errs
            console.log('Update SuccessFul')
            EeUpdateMenu(first, last)
        })
    })
}
let eeManUpdate = (newMan, first, last) =>{
        
        let sql = `Update ee SET manager_id=?  WHERE firstName=? AND lastName= ?`
        let params = [newMan, first, last]
        db.query(sql,params,  (errs, emp) =>{
            if (errs) throw errs
            console.log('Update SuccessFul')
            EeUpdateMenu(first, last)
        })
}

//Starts the app
startUp();
module.exports = { db }