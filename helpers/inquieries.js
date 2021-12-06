const inquierer = require('inquirer')

// all questions  
let menuOptions = ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
let menu = () =>{
    return inquierer.prompt([
        {
            type: 'list',
            name: 'menuPick',
            message: 'What would you like do?',
            choices: menuOptions
        },
    ])
};

let addDeptMenu = () => {
    return inquierer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is your new Department called?'
        }
    ])

}
let addRoleMenu = ()=> {
    return inquierer.prompt([
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
    return inquierer.prompt([
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


module.exports = { menu, addDeptMenu, addRoleMenu, addEeMenu };