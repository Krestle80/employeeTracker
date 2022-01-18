
const inquirer = require('inquirer')

let menuOptions = ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', "Update an Employee's data", 'exit']
// all questions  
let menu = () =>{
    return inquirer.prompt([
        {
            type: 'list',
            name: 'menuPick',
            message: 'What would you like do?',
            choices: menuOptions
        },
    ])
};
//all prompts
let addDeptMenu = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is your new Department called?'
        }
    ])

}
let addRoleMenu = ()=> {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What is the name of your new Role'
        },
        {
            type: 'input',
            name: 'roleSalary',
            message: 'What is the salary of your new Role?'
        },
        {
            type: 'input',
            name: 'roleDept',
            message: 'What department is your new Role in?'
        },

    ])

}
let addEeMenu = () =>{
    return inquirer.prompt([
        {
            type:'input',
            name: 'eeFirst',
            message:"What is your new Employee's first name?"
        },
        {
            type:'input',
            name:'eeLast',
            message:"What is your new Employee's last name?"
        },
        {
            type:'input',
            name:'eeRole',
            message:"What is your new Employee's role?"
        },
        {
            type:'input',
            name:'eeman',
            message:"Who is your new Employee's manager?"
        }
    ])
}

let SelectEeMenu = () =>{
    return inquirer.prompt([
        {
            type: 'input',
            name:'eeFirst',
            message:"Plese type in your employee's first name"
        },
        {
            type: 'input',
            name:'eeLast',
            message:"Plese type in your employee's last name"
        }
    ])
}

let EeUpdateMenu = (employeefirst, employeeLast) =>{
    return inquirer.prompt([
        {
            type: 'list',
            name:'eeUpdateMenu',
            message:'What would you like to update about:' + employeefirst + ' ' + employeeLast,
            choices: ['First Name', 'Last Name', 'Role', 'Manager', 'Return to Main Menu']
        }
    ])
}

let eeFirst = ()=>{
    return inquirer.prompt([
        {
            type: 'input',
            name:'eeFirst',
            message: "Please Type in the employee's first name."
        }
    ])
}
let eeLast = ()=>{
    return inquirer.prompt([
        {
            type: 'input',
            name:'eeLast',
            message: "Please Type in the employee's last name."
        }
    ])
}
let eeRole = ()=>{
    return inquirer.prompt([
        {
            type: 'input',
            name:'eeRole',
            message: "Please Type in the employee's new role."
        }
    ])
}

let eeMan = ()=>{
    return inquirer.prompt([
        {
            type: 'input',
            name:'manId',
            message: "Please Type in the employee's new Manager."
        }
    ])
}
module.exports = { menu, addDeptMenu, addRoleMenu, addEeMenu, SelectEeMenu, EeUpdateMenu, eeFirst, eeLast, eeRole, eeMan };