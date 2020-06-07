const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const employees = [];

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray =[];
function newEmployee(){

    function createManager() {
        console.log("Please build your team!");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is the Manager's name?",
                validate: answer => {
                    if (answer !=="") {
                        return true;
                    }
                    return "Please enter at least one character.";
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is the Manager's id?",
                validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass){
                    return true;
                } 
                return "Please enter a positive number greater than zero.";
                }   
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is the Manager's email address?",
                validate: answer => {
                    const pass = answer.match(
                        /\S+@\S+\.\S+/
                    );
                    if (pass) {
                        return true;
                      }
                      return "Please enter a valid email address.";
                    }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                default: "",
                message: "What is your Manager's office number?",
                validate: answer => {
                    const pass = answer.match(
                      /^[1-9]\d*$/
                    );
                    if (pass) {
                      return true;
                    }
                    return "Please enter a positive number greater than zero.";
                  }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            teamMembers.push(manager);
            idArray.push(answers.managerId);
            createTeam();
        });
    }
    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Anymore team members to add?",
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
    }
        function addEngineer(){
            inquirer.prompt([
                {
                    type: "input",
                    name: "engineerName",
                    message: "What is the Engineer's name?",
                    validate: answer => {
                        if (answer !== "") {
                          return true;
                        }
                        return "Please enter at least one character.";
                      }
                },
                {
                    type: "input",
                    name: "engineerId",
                    message: "What is the Engineer's id?",
                    validate: answer => {
                        const pass = answer.match(
                          /^[1-9]\d*$/
                        );
                        if (pass) {
                          if (idArray.includes(answer)) {
                            return "This ID is already taken. Please enter a different number.";
                          } else {
                            return true;
                          }
                        }
                        return "Please enter a positive number greater than zero.";
                      }
                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "What is the Engineer's email address?",
                    validate: answer => {
                        const pass = answer.match(
                          /\S+@\S+\.\S+/
                        );
                        if (pass) {
                          return true;
                        }
                        return "Please enter a valid email address.";
                      }
                },
                {
                type: "input",
                name: "engineerGithub",
                default: "",
                message: "What is your Github Username?",
                validate: answer => {
                    if (answer !== "") {
                      return true;
                    }
                    return "Please enter at least one character.";
                  }
                }
                ]).then(answers => {
                const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
                teamMembers.push(engineer);
                idArray.push(answers.engineerId);
                createTeam();
                });
        }
        function addIntern(){
            inquirer.prompt([
                {
                    type: "input",
                    name: "internName",
                    message: "What is the Intern's name?",
                    validate: answer => {
                        if (answer !=="") {
                            return true;
                        }
                        return "Please enter at least one character.";
                    }
                },
                {
                    type: "input",
                    name: "internId",
                    message: "What is the Intern's id?",
                    validate: answer => {
                        const pass = answer.match(
                          /^[1-9]\d*$/
                        );
                        if (pass) {
                          if (idArray.includes(answer)) {
                            return "This ID is already taken. Please enter a different number.";
                          } else {
                            return true;
                          }
                        }
                        return "Please enter a positive number greater than zero.";
                      }
                },
                {
                    type: "input",
                    name: "internEmail",
                    message: "What is the Intern's email address?",
                    validate: answer => {
                        const pass = answer.match(
                          /\S+@\S+\.\S+/
                        );
                        if (pass) {
                          return true;
                        }
                        return "Please enter a valid email address.";
                      }
                },
                {
                type: "input",
                name: "internSchool",
                default: "",
                message: "What school did the Intern attend?",
                validate: answer => {
                    if (answer !== "") {
                      return true;
                    }
                    return "Please enter at least one character.";
                  }
                }
                ]).then(answers => {
                const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
                teamMembers.push(intern);
                idArray.push(answers.internId);
                createTeam();
                });
        }
        function buildTeam(){
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR)
              }
          
            fs.writeFileSync(outputPath,render(teamMembers),"utf-8");
        }
        
    
    createManager();
}
newEmployee();
