const inquirer = require('inquirer')
const mysql = require('mysql2')
const console_table = require('console.table')
var departments = []
var rolesValues = []
var roles = []
var managersValues = []
var managers = []
var employeeValues = []
var employees = []


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
       managers.push(array[i].managerName);
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
    var newemployeeData = "INSERT INTO department(first_name, last_name, role_id, manager_id) VALUES(" + '"'+ data.employeeFirstName + '", ' + data.employeeLastName + ', "' + idhelper(roles, data.employeeRoleAdd) + '"' + '"' + idhelper(managers, data.employeeManager) + '"' + ")"
    console.log(newemployeeData)

}) 


    })
   
   
    })


}

function updateEmployee() {
    console.log("updated Employee Role")
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
     console.log(departments)
     
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
    var newroleData = "INSERT INTO department(name, title, salary, department) VALUES(" + '"'+ data.roleNameAdd + '", ' + data.RoleSalaryAdd + ', "' + idhelper(departments, data.roledeptAdd) + '"' +")"
    console.log(newroleData)

})})
       
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

    })
     init()
}

init();