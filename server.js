const inquirer = require('inquirer')
const mysql = require('mysql2')
const console_table = require('console.table')
var departments = []
var rolesValues = []
var roles = []
var managersValues = []
var managers = []
var employeeValues = []
var employee = []


const db = mysql.createConnection(
{
    host: 'localhost',
    user:'root',
    password: "Imthenextgen$15",
    port: 3306,
    database: "workforce_db"
}
)

function idhelper(array, choice) {

    for(var i = 0; i < array.length; i++){
    if(array[i].name === choice){
        return array[i].id
    } else if (array[i].managerName === choice){
        return array[i].id
    } else if (array[i].title === choice){
        return array[i].id
    } else if (array[i].first_name === choice){
        return array[i].id
    }
}
}

function rolesHelper(array) {
    for(let i = 0; i < array.length; i++){

    
       roles.push(array[i].title);

     
    }
}

function managerHelper(array) {
    for(let i = 0; i < array.length; i++){
       managers.push(array[i].managerName);
}}

function employeeHelper(array) {
    for(let i = 0; i < array.length; i++){
       employee.push(array[i].first_name);
}}

function init() {
  inquirer.prompt([{
        type: 'list',
        name: 'managerChoice',
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    }]).then(function(data) {
        switch(data.managerChoice) {
            case "View All Employees":
                viewEmployee();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployee();
                break;
            case "View All Roles":
                viewRoles();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewDepartments();
                break;
            case "Add Department": 
                addDep();
                break;
            case "Quit":
                return;
        }
    })
}

function viewEmployee(){
    db.query('Select * FROM employee', function (err, results) {
        console.table(results)
        init()
    })
    
  
}

function addEmployee() {
    
    var managerQuery = db.query("SELECT * FROM workforce_db.manager", function(err, results) {
      
     results.forEach((element, index) => managersValues.push(element))

     managerHelper(managersValues)
     
    var roleQuery = db.query("SELECT * FROM workforce_db.roles", function(err, results) {
        results.forEach((element, index) => rolesValues.push(element));
        
        rolesHelper(rolesValues)
        


             
    inquirer.prompt([{
        type: "input",
        name:"employeeFirstName",
        message: "What is the employee's first name?"
    }, 
    {
        type: "input",
        name: "employeeLastName",
        message: "What is the employee's last name?"
    }, 
    {
        type: "list",
        name: "employeeRoleAdd",
        message: "What is the employee's role?",
        choices: roles
    },
    {
        type: "list",
        name: "employeeManager",
        message: "Who is the employee's manager?",
        choices: managers
    }

]).then(function(data){
    var newemployeeData = "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(" + '"'+ data.employeeFirstName + '","' + data.employeeLastName + '",' + idhelper(rolesValues, data.employeeRoleAdd) + ','  + idhelper(managersValues, data.employeeManager)  + ")"

        db.query(newemployeeData, function(err, results) {
            if(err) throw err;
            init()
        })
        
        console.log(newemployeeData)

}) 
})
})
}

function updateEmployee() {
    var employeeQuery = db.query("SELECT * FROM workforce_db.employee", function(err, results) {
      
     results.forEach((element, index) => employeeValues.push(element))

     employeeHelper(employeeValues)

         var roleQuery = db.query("SELECT * FROM workforce_db.roles", function(err, results) {
        results.forEach((element, index) => rolesValues.push(element));
        
        rolesHelper(rolesValues)

        inquirer.prompt([{
            type: "list",
            name: "updateEmployee",
            message: "Wich employee's role do you want to update?",
            choices: employee
        }, 
        {
            type: "list",
            name: "updateRole",
            message: "Which role do you want to assign to the selected employee?",
            choices: roles
        },
    ]).then(function(data){
        var updateEmployee = "UPDATE employee SET role_id = " + idhelper(rolesValues, data.updateRole)  +  " WHERE id = " + idhelper(employeeValues, data.updateEmployee)
            db.query(updateEmployee, function(err, results) {
            if(err) throw err;
            init()
        })
        
    })
    

    })

})
     
}

function viewRoles() {
    db.query('Select * FROM roles', function (err, results) {
        console.table(results)
        init()
    })
   
}

async function addRole() {

    var departmentsQuery = db.query("SELECT * FROM workforce_db.department", function(err, results) {
      
     results.forEach((element, index) => departments.push(element))
    

    inquirer.prompt([{
        type: "input",
        name:"roleNameAdd",
        message: "What is the name of the new role?"
    }, 
    {
        type: "number",
        name: "RoleSalaryAdd",
        message: "What is the salary for  this role?"
    }, 
    {
        type: "list",
        name: "roledeptAdd",
        message: "What department does the role belong to?",
        choices: departments
    }


]).then(function(data){
    var newroleData = "INSERT INTO roles(title, salary, department_id) VALUES(" + '"'+ data.roleNameAdd + '", ' + data.RoleSalaryAdd + ', ' + idhelper(departments, data.roledeptAdd) +")"
    db.query(newroleData, function(err, results) {
            if(err) throw err;
        })
    init()
    

}) 
 
})
       
}


function viewDepartments(){
  db.query('Select * FROM department', function (err, results) {
        console.table(results);
        init()
    })
  
}

async function addDep(){
    await inquirer.prompt([{
       type:"input",
       name: "newDept",
       message: "What is the name of the new department?" 
    }]).then(function(data) {
        var newDepts = "INSERT INTO department(name) VALUES(" + '"'+ data.newDept + '"' + ")"
        console.log(newDepts)
        db.query(newDepts, function(err, results) {
            if(err) throw err;
        })
    init()
    })
     
}

init();