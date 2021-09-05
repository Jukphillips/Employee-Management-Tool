const inquirer = require('inquirer')
const mysql = require('mysql2')
const console_table = require('console.table')

const db = mysql.createConnection(
{
    host: 'localhost',
    user:'root',
    password: "Imthenextgen$15",
    port: 3306,
    database: "workforce_db"
}
)



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
    })
    init()
  
}

function addEmployee() {
    console.log("Added an Employee")

}

function updateEmployee() {
    console.log("updated Employee Role")
}

function viewRoles() {
    db.query('Select * FROM roles', function (err, results) {
        console.table(results)
    })
   init()
}

function addRole() {
    console.log('added new role')
}

function viewDepartments(){
  db.query('Select * FROM department', function (err, results) {
        return console.table(results);
    })
  init()
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

init()