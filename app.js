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
            
        }
    ]

    const additionalEmployee = [
        {
            type: "list",
            name: "addEmployee",
            message: "Would you like to add another employee?",
            choices: [
                "yes",
                "no"
            ]
        }
    ]
    
    function addEmployee () {
        inquirer.prompt(additionalEmployee).then(function(data) {
            if ("addEmployee" === "yes") {
                employeeQuestions()
            }else {
            newHTML();
            }
    })

    }
    function newEmployee() {
        inquirer.prompt(employeeQuestions).then(function(data) {
            let newEmployee = new Engineer || new Intern || new Manager;
            employees.push(newEmployee);
            addEmployee();
        })
    }
            // need to feed main.html/$teamHTMLtemplate into outputPath
    function newHTML () {
        // const teamHTML = fs.readFileSync("templates/main.html");
        // teamHTML = render(employees);
        fs.writeFileSync(outputPath, render(employees)), function (err) {
            if (err) {
                throw err;
            }
        console.log("Team Built")
    }
}

newEmployee();
