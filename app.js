const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function mustNotBeEmpty(str, fieldName) {
  if (str === "") {
    return `${fieldName} cannot be empty.`;
  }
  return true;
}

function writeToFile(data) {
  fs.writeFile(outputPath, data, (err) => {
    if (err) {
      console.log(err.message);
      console.log("The file has not been saved!");
      process.exit(1);
    } else {
      console.log("The file has been saved!");
    }
  });
}

function welcomeScreen() {
  return inquirer.prompt([
    {
      type: "list",
      name: "welcome",
      message:
        "Welcome! This application generates an employee directory. Press continue to proceed?",
      choices: ["Continue", "Exit"],
    },
  ]);
}

function readManager() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is manager's name?",
        validate: (name) => mustNotBeEmpty(name, "Manager's name"),
      },
      {
        type: "input",
        name: "id",
        message: "What is manager's ID?",
        validate: (name) => mustNotBeEmpty(name, "Manager's id"),
      },
      {
        type: "input",
        name: "email",
        message: "What is manager's email?",
        validate: (name) => mustNotBeEmpty(name, "Manager's email"),
      },
      {
        type: "input",
        name: "office",
        message: "What is manager's office number?",
        validate: (name) => mustNotBeEmpty(name, "Manager's office"),
      },
    ])
    .then(
      (manager) =>
        new Manager(manager.name, manager.id, manager.email, manager.office)
    );
}

function run() {
  welcomeScreen()
    .then((data) => {
      if (data.welcome === "Exit") {
        process.exit(0);
      }
    })
    .then(() => readManager())
    .then((manager) => render([manager]))
    .then((html) => writeToFile(html));
}

run();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
