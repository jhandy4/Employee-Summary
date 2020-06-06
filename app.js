const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const employees = [];
// const idArray =[];
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

// function newEmployee(){

    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the Manager's name?"
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the Manager's id?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the Manager's email address?"
            },
           
            {
                type: "input",
                name: "managerOffice",
                default: "",
                message: "What is your office number?"
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
            employees.push(manager);
            // idArray.push(answers.managerId);
            createTeam();
        })
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which new team members to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "No more!"
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice){
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
        function addEngineer(){
            inquirer.prompt([
                {
                    type: "input",
                    name: "engineerName",
                    message: "What is the Engineer's name?"
                },
                {
                    type: "input",
                    name: "engineerId",
                    message: "What is the Engineer's id?"
                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "What is the Engineer's email address?"
                },
                {
                type: "input",
                name: "engineerGithub",
                default: "",
                message: "What is your Github Username?"
                }
                ]).then(answers => {
                const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
                employees.push(engineer);
                // idArray.push(answers.engineerId);
                createTeam();
                })
        }
        function addIntern(){
            inquirer.prompt([
                {
                    type: "input",
                    name: "internName",
                    message: "What is the Intern's name?"
                },
                {
                    type: "input",
                    name: "internId",
                    message: "What is the Intern's id?"
                },
                {
                    type: "input",
                    name: "internEmail",
                    message: "What is the Intern's email address?"
                },
                {
                type: "input",
                name: "internSchool",
                default: "",
                message: "What school did the Intern attend?"
                }
                ]).then(answers => {
                const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
                employees.push(intern);
                // idArray.push(answers.internId);
                createTeam();
                })
        }
    }

    // function addEngineer
    // fct addIntern
    //fct buildTeam
    function buildTeam(){
        fs.writeFileSync(outputPath,render(employees),"utf-8");
    }
    createManager();
    // buildTeam();
// }
// newEmployee();
