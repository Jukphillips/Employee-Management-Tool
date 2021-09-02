const inquirer = require('inquirer')
const mysql = require('mysql2')
const console_table = require('console.table')


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
    console.log('View all Employee');
}

function addEmployee() {
    console.log("Added an Employee")
}

function updateEmployee() {
    console.log("updated Employee Role")
}

function viewRoles() {
    console.log('view all roles')
}

function addRole() {
    console.log('added new role')
}

function viewDepartments(){
    console.log('View all Departments')
}

function addDep(){
    console.log('Add Department')
}

init()