const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
let employees = [];
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");



    const employeeQuestions =
        [
        {
            type: "input",
            name: "name",
            message: "What is the employee's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the employee's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the employee's email address?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: ["Engineer", "Intern", "Manager"]
        },
        {
            type: "input",
            name: "github",
            default: "",
            message: "What is your Github Username?",
            
        },
        {
            type: "input",
            name: "school",
            default: "",
            message: "What school did the employee attend?",
            
        },
        {
            type: "input",
            name: "office",
            default: "",
            message: "What is your office number?",
            
        },
        {
            type: "confirm",
            name: "addEmployee",
            message: "Would you like to add another employee?",
        }
        ];
    
    
    function newEmployee() {
        inquirer.prompt(employeeQuestions).then(function(data) {
            let newEmployee;
            newEmployee = new Engineer || new Intern || new Manager;
            employees.push(newEmployee);
            // keeps saying push is not a function at render

            
            template = render(employees);
            fs.writeFile(outputPath, teamHTML, err => {
                if (err) throw err;
                    console.log("Team Built!")
            })
        })
        }   
        

newEmployee();
