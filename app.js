const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// Set Global Variables
let employeeArray = [];
let employeeID = 1;
let employeeInfo = {};
// Array of questions that node will prompt
let questions = [
  {
    type: "input",
    message: "Employee's name?",
    name: "name",
  },
  {
    type: "input",
    message: "Employee's email?",
    name: "email",
  },
  {
    //   this one is important. This is where we will later use a switch statement to ask different questions.
    message: "Employee role question",
    name: "specificQuestion",
  },
  {
    type: "list",
    message: "Employee's role in the company?",
    name: "role",
    choices: ["Engineer", "Intern", "no more employees to add"],
  },
];
// Function that starts inquirer
let newEmployeeQuestion = (specificQuestion, role) => {
  questions[2].message = specificQuestion;

  inquirer.prompt(questions).then((response) => {
    employeeInfo = {};

    employeeInfo.name = response.name;

    employeeInfo.email = response.email;

    employeeInfo.specificQuestion = response.specificQuestion;

    employeeInfo.role = role;

    employeeInfo.id = employeeID;

    storeEmployees(employeeInfo, response.role);
  });
};
// When choosing in node, using an if else statement to make sure it goes through each possible variable.
let storeEmployees = (employee, nextEmployee) => {
  if (employee.role === "Manager") {
    var newEmployee = new Manager(
      employee.name,
      employee.id,
      employee.email,
      employee.specificQuestion
    );
  } else if (employee.role === "Engineer") {
    var newEmployee = new Engineer(
      employee.name,
      employee.id,
      employee.email,
      employee.specificQuestion
    );
  } else {
    var newEmployee = new Intern(
      employee.name,
      employee.id,
      employee.email,
      employee.specificQuestion
    );
  }
//   push the array to the new Employee variable
  employeeArray.push(newEmployee);
//   Add one to the ID
  employeeID++;
// this is going through and picking what to say dependent on what the user chose
  switch (nextEmployee) {
    case "Manager":
      newEmployeeQuestion("Employee's office number?", "Manager");
      break;
    case "Engineer":
      newEmployeeQuestion("Employee's github?", "Engineer");
      break;
    case "Intern":
      newEmployeeQuestion("What school did the employee attend?", "Intern");
      break;
      case "no more employees to add":
        //   When done inputing your data, this render method will start making the HTML
      let htmlRender = render(employeeArray);
      writeHTML(htmlRender);
      default:
          return;
  }
};
// Finishing by creating the HTML file
let writeHTML = (htmlRender) => {

    fs.writeFile(outputPath, htmlRender, (err) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Creating your file")
        }
    });

}
// Starting everything off as Manager
newEmployeeQuestion("Employee's office number? ", "Manager")




